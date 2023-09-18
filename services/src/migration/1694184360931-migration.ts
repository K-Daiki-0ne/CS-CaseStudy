import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1694184360931 implements MigrationInterface {
    name = 'migration1694184360931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`userId\` varchar(36) NOT NULL, \`userName\` varchar(20) NOT NULL, \`password\` varchar(20) NOT NULL, \`email\` varchar(255) NOT NULL, \`professionId\` varchar(2) NOT NULL, \`age\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_638bac731294171648258260ff\` (\`password\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_638bac731294171648258260ff\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
