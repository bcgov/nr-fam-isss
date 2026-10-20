import treeLogs from "@/assets/images/tree-logs.jpg";
import { getEnvValue } from "@/utils/EnvUtils";

/**
 * What the product calls itself, and the photograph beside its sign-in page.
 *
 * <p>Read from `env.json` at runtime so one image can be deployed under another
 * name - the ISSS deployment runs this code as its own access-management product -
 * without a source change that every upstream merge would conflict on. Every key
 * is optional; a deployment that sets none of them looks exactly as FAM always has.
 */
export interface Branding {
    /** Full product name: header, sign-in subtitle, browser tab. */
    name: string;
    /** Short name: header prefix, sign-in title, and in-sentence references. */
    acronym: string;
    /** URL of the sign-in photograph, same-origin so the CSP's img-src allows it. */
    landingImageUrl: string;
    /** Alt text for that photograph. */
    landingImageAlt: string;
    /**
     * `cover` fills the full-height column, cropping as needed (FAM's tall photograph).
     * `natural` shows the photograph at no more than its own size, so a smaller or
     * landscape one is not stretched.
     */
    landingImageFit: LandingImageFit;
}

export type LandingImageFit = "cover" | "natural";

export const DEFAULT_BRANDING: Branding = {
    name: "Forests Access Management",
    acronym: "FAM",
    landingImageUrl: treeLogs,
    landingImageAlt: "Stacked logs at a British Columbia mill",
    landingImageFit: "cover",
};

/**
 * The branding for this deployment: each `env.json` value that is set, else
 * FAM's own.
 */
export const getBranding = (): Branding => ({
    name: getEnvValue("app_name") ?? DEFAULT_BRANDING.name,
    acronym: getEnvValue("app_acronym") ?? DEFAULT_BRANDING.acronym,
    landingImageUrl:
        getEnvValue("landing_image_url") ?? DEFAULT_BRANDING.landingImageUrl,
    landingImageAlt:
        getEnvValue("landing_image_alt") ?? DEFAULT_BRANDING.landingImageAlt,
    landingImageFit:
        getEnvValue("landing_image_fit") === "natural" ? "natural" : "cover",
});
