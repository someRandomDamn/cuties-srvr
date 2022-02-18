import {MigrationInterface, QueryRunner} from "typeorm";

export class update1645122199671 implements MigrationInterface {
    name = 'update1645122199671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction_log\` DROP FOREIGN KEY \`FK_49d260f79289be40ea0f0092813\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_c0e1460f3c9eee975fee81002dc\``);
        await queryRunner.query(`DROP INDEX \`IDX_de4f0899c41c688529784bc443\` ON \`transaction\``);
        await queryRunner.query(`DROP INDEX \`IDX_f8fba63d7965bfee9f304c487a\` ON \`block\``);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` CHANGE \`transaction_id\` \`transaction_hash\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`block_id\``);
        await queryRunner.query(`ALTER TABLE \`block\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`block\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`block\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`block_hash\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` DROP COLUMN \`transaction_hash\``);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` ADD \`transaction_hash\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD PRIMARY KEY (\`hash\`)`);
        await queryRunner.query(`ALTER TABLE \`block\` ADD PRIMARY KEY (\`hash\`)`);
        await queryRunner.query(`ALTER TABLE \`block\` CHANGE \`date_created\` \`date_created\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` ADD CONSTRAINT \`FK_84d541ba7636fd4ae86e94bda09\` FOREIGN KEY (\`transaction_hash\`) REFERENCES \`transaction\`(\`hash\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_bfc0a8772e125ff10707b8a5a9d\` FOREIGN KEY (\`block_hash\`) REFERENCES \`block\`(\`hash\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_bfc0a8772e125ff10707b8a5a9d\``);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` DROP FOREIGN KEY \`FK_84d541ba7636fd4ae86e94bda09\``);
        await queryRunner.query(`ALTER TABLE \`block\` CHANGE \`date_created\` \`date_created\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`block\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` DROP COLUMN \`transaction_hash\``);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` ADD \`transaction_hash\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`block_hash\``);
        await queryRunner.query(`ALTER TABLE \`block\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`block\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`block\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`block_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` CHANGE \`transaction_hash\` \`transaction_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_f8fba63d7965bfee9f304c487a\` ON \`block\` (\`hash\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_de4f0899c41c688529784bc443\` ON \`transaction\` (\`hash\`)`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_c0e1460f3c9eee975fee81002dc\` FOREIGN KEY (\`block_id\`) REFERENCES \`block\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` ADD CONSTRAINT \`FK_49d260f79289be40ea0f0092813\` FOREIGN KEY (\`transaction_id\`) REFERENCES \`transaction\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
