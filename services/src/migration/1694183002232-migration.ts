import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1694183002232 implements MigrationInterface {
    name = 'migration1694183002232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`study\` (\`studyId\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`studyYear\` year NOT NULL, \`studyDate\` int NOT NULL, \`studyTime\` int NOT NULL, \`studyTagId\` int NOT NULL, \`studyContent\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_f503568ffeb11ed4d0bd69d29a\` (\`studyYear\`), PRIMARY KEY (\`studyId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`study_tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`studyTagKey\` varchar(2) NOT NULL, \`studyTagLabel\` varchar(20) NOT NULL, \`show\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_0aece1acfc063cb634382cdd3a\` (\`userId\`), INDEX \`IDX_f1897cceda531a83a9cb9b8424\` (\`show\`), PRIMARY KEY (\`id\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`study_history\` (\`StudyHistoryId\` int NOT NULL AUTO_INCREMENT, \`studyId\` int NOT NULL, \`userId\` varchar(255) NOT NULL, \`postDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedFlg\` varchar(255) NOT NULL, \`studyYear\` year NOT NULL, \`studyDate\` int NOT NULL, \`studyTime\` int NOT NULL, \`studyTagId\` int NOT NULL, \`studyContent\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_2ea1cdf297fef80260d21f7d73\` (\`studyYear\`), PRIMARY KEY (\`StudyHistoryId\`, \`studyId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`userId\` varchar(36) NOT NULL, \`userName\` varchar(20) NOT NULL, \`password\` varchar(20) NOT NULL, \`email\` varchar(255) NOT NULL, \`professionId\` varchar(2) NOT NULL, \`age\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_638bac731294171648258260ff\` (\`password\`), INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_638bac731294171648258260ff\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_2ea1cdf297fef80260d21f7d73\` ON \`study_history\``);
        await queryRunner.query(`DROP TABLE \`study_history\``);
        await queryRunner.query(`DROP INDEX \`IDX_f1897cceda531a83a9cb9b8424\` ON \`study_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_0aece1acfc063cb634382cdd3a\` ON \`study_tag\``);
        await queryRunner.query(`DROP TABLE \`study_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_f503568ffeb11ed4d0bd69d29a\` ON \`study\``);
        await queryRunner.query(`DROP TABLE \`study\``);
    }

}
