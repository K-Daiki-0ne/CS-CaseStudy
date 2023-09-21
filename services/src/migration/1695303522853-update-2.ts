import { MigrationInterface, QueryRunner } from "typeorm";

export class update21695303522853 implements MigrationInterface {
    name = 'update21695303522853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`goal\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`goal\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`goal\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`goal\` char NOT NULL`);
    }

}
