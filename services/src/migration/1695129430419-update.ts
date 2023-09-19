import { MigrationInterface, QueryRunner } from "typeorm";

export class update1695129430419 implements MigrationInterface {
    name = 'update1695129430419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`goal\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`study\` ADD \`studyMinute\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`goal\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`goal\` char NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`goal\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`goal\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`study\` DROP COLUMN \`studyMinute\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`goal\` \`age\` int NOT NULL`);
    }

}
