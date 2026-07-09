PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text,
	`title` text NOT NULL,
	`role` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessins`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "role_check" CHECK("__new_messages"."role" IN ('USER', 'SYSTEM'))
);
--> statement-breakpoint
INSERT INTO `__new_messages`("id", "session_id", "title", "role", "created_at") SELECT "id", "session_id", "title", "role", "created_at" FROM `messages`;--> statement-breakpoint
DROP TABLE `messages`;--> statement-breakpoint
ALTER TABLE `__new_messages` RENAME TO `messages`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_projects` (
	`id` text PRIMARY KEY NOT NULL,
	`root_path` text NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_projects`("id", "root_path", "name", "created_at") SELECT "id", "root_path", "name", "created_at" FROM `projects`;--> statement-breakpoint
DROP TABLE `projects`;--> statement-breakpoint
ALTER TABLE `__new_projects` RENAME TO `projects`;--> statement-breakpoint
CREATE TABLE `__new_sessins` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`title` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "role_check" CHECK("__new_sessins"."title" IN ('ACTIVE', 'CLOSED'))
);
--> statement-breakpoint
INSERT INTO `__new_sessins`("id", "project_id", "title", "created_at") SELECT "id", "project_id", "title", "created_at" FROM `sessins`;--> statement-breakpoint
DROP TABLE `sessins`;--> statement-breakpoint
ALTER TABLE `__new_sessins` RENAME TO `sessins`;