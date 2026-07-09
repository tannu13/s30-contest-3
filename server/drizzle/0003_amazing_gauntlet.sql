PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sessins` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`title` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`closed_at` integer,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "role_check" CHECK("__new_sessins"."title" IN ('ACTIVE', 'CLOSED'))
);
--> statement-breakpoint
INSERT INTO `__new_sessins`("id", "project_id", "title", "created_at", "closed_at") SELECT "id", "project_id", "title", "created_at", "closed_at" FROM `sessins`;--> statement-breakpoint
DROP TABLE `sessins`;--> statement-breakpoint
ALTER TABLE `__new_sessins` RENAME TO `sessins`;--> statement-breakpoint
PRAGMA foreign_keys=ON;