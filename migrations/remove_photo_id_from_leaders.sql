-- Drop the foreign key constraint first
ALTER TABLE "public"."leaders" 
DROP CONSTRAINT IF EXISTS "leaders_photo_id_media_id_fk";

-- Drop the index on photo_id
DROP INDEX IF EXISTS "public"."leaders_photo_idx";

-- Remove the photo_id column
ALTER TABLE "public"."leaders" 
DROP COLUMN IF EXISTS "photo_id";


ALTER TABLE "public"."members" ALTER COLUMN "photo_url" TYPE text USING "photo_url"::text;