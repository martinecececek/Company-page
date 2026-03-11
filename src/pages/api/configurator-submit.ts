import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { APIRoute } from "astro";

type JsonRecord = Record<string, unknown>;

const isJsonRecord = (value: unknown): value is JsonRecord =>
   value !== null && typeof value === "object" && !Array.isArray(value);

const safeParseJson = (value: FormDataEntryValue | null) => {
   if (typeof value !== "string" || !value.trim()) {
      return null;
   }

   try {
      return JSON.parse(value);
   } catch {
      return null;
   }
};

const getStringField = (formData: FormData, key: string) => {
   const value = formData.get(key);
   return typeof value === "string" ? value : "";
};

const withNullFallback = (value: unknown, fallbackValue = "") => {
   if (typeof value === "string") {
      return value || fallbackValue || null;
   }

   return value ?? (fallbackValue || null);
};

const buildRecordValue = (value: FormDataEntryValue) => {
   if (typeof value === "string") {
      return value;
   }

   return {
      name: value.name,
      type: value.type,
      size: value.size,
      lastModified: value.lastModified,
   };
};

const appendRecordField = (
   record: Record<string, unknown>,
   key: string,
   value: unknown,
) => {
   const existing = record[key];

   if (typeof existing === "undefined") {
      record[key] = value;
      return;
   }

   if (Array.isArray(existing)) {
      existing.push(value);
      record[key] = existing;
      return;
   }

   record[key] = [existing, value];
};

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
   try {
      const formData = await request.formData();
      const submittedData: Record<string, unknown> = {};

      for (const [key, value] of formData.entries()) {
         if (typeof value === "string" && !value.trim()) {
            continue;
         }

         appendRecordField(submittedData, key, buildRecordValue(value));
      }

      const parsedConfig = safeParseJson(formData.get("config"));
      const parsedContentInputJson = safeParseJson(
         formData.get("contentInputJson"),
      );

      const config = isJsonRecord(parsedConfig) ? parsedConfig : null;
      const design = isJsonRecord(config?.design) ? config.design : null;
      const details = isJsonRecord(config?.details) ? config.details : null;
      const estimate = isJsonRecord(config?.estimate) ? config.estimate : null;

      const pages = Array.isArray(config?.pages) ? config.pages : [];
      const features = Array.isArray(config?.features) ? config.features : [];
      const fallbackHostingType = getStringField(formData, "hostingType");
      const fallbackEstimatedPrice = getStringField(
         formData,
         "estimatedPriceRange",
      );
      const fallbackEstimatedTimeline = getStringField(
         formData,
         "estimatedTimeline",
      );

      const contentInputs = isJsonRecord(config?.contentInputs)
         ? config.contentInputs
         : isJsonRecord(parsedContentInputJson)
           ? parsedContentInputJson
           : null;

      const record = {
         id: randomUUID(),
         submittedAt: new Date().toISOString(),
         contact: {
            name: getStringField(formData, "name"),
            email: getStringField(formData, "email"),
            company: getStringField(formData, "company"),
            message: getStringField(formData, "message"),
         },
         configuration: {
            websiteType: config?.websiteType ?? null,
            hosting: withNullFallback(config?.hosting, fallbackHostingType),
            pages,
            features,
            design: design
               ? {
                    template: design.template ?? null,
                    mode: design.mode ?? null,
                    fontPair: design.fontPair ?? null,
                    fontHeading: design.fontHeading ?? null,
                    fontBody: design.fontBody ?? null,
                    colors: isJsonRecord(design.colors) ? design.colors : {},
                 }
               : null,
            details: details ?? null,
            estimate: {
               ...(estimate ?? {}),
               priceRange: withNullFallback(
                  estimate?.price,
                  fallbackEstimatedPrice,
               ),
               timeline: withNullFallback(
                  estimate?.timeline,
                  fallbackEstimatedTimeline,
               ),
            },
            contentInputs,
         },
         data: submittedData,
      };

      const outputDir = path.join(process.cwd(), "data-temp");
      await mkdir(outputDir, { recursive: true });

      const filename = `${record.submittedAt.replaceAll(":", "-").replaceAll(".", "-")}-${record.id}.json`;
      const outputPath = path.join(outputDir, filename);

      await writeFile(outputPath, JSON.stringify(record, null, 2), "utf-8");

      return new Response(null, {
         status: 303,
         headers: {
            Location: "/thank-you",
         },
      });
   } catch (error) {
      console.error("Failed to save configurator submission", error);

      return new Response(null, {
         status: 303,
         headers: {
            Location: "/thank-you?status=error",
         },
      });
   }
};
