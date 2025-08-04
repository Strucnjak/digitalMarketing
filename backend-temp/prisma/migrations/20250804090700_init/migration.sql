-- CreateTable
CREATE TABLE `ContactMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsultationRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `businessType` VARCHAR(191) NOT NULL,
    `currentChallenges` VARCHAR(191) NOT NULL,
    `goals` VARCHAR(191) NOT NULL,
    `interestedServices` JSON NOT NULL,
    `preferredContact` VARCHAR(191) NOT NULL,
    `preferredTime` VARCHAR(191) NOT NULL,
    `additionalInfo` VARCHAR(191) NOT NULL,
    `newsletter` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceInquiry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `selectedService` VARCHAR(191) NOT NULL,
    `selectedPackage` VARCHAR(191) NOT NULL,
    `projectTypes` JSON NOT NULL,
    `currentSituation` VARCHAR(191) NOT NULL,
    `projectGoals` VARCHAR(191) NOT NULL,
    `targetAudience` VARCHAR(191) NOT NULL,
    `timeline` VARCHAR(191) NOT NULL,
    `budget` VARCHAR(191) NOT NULL,
    `additionalServices` JSON NOT NULL,
    `preferredContact` VARCHAR(191) NOT NULL,
    `additionalInfo` VARCHAR(191) NOT NULL,
    `howDidYouHear` VARCHAR(191) NOT NULL,
    `newsletter` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

