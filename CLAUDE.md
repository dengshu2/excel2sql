- 我想做一个 Excel CS v 到 SQL 的插件。前端架构使用 next.js,所有处理逻辑都在前端处理需要确保隐私。你可以使用playwright去获取前端界面信息；参考网址：https://tableconvert.com/excel-to-sql#google_vignette，我只需要核心功能就好了。前端界面尽可能的简洁高效，转换的 SQL 类型为 Spark SQL，\
\
CREATE TABLE tableName (
    `id`     INT,
    `name`   STRING,
    `age`    INT,
    `gender` STRING
);\
\
INSERT INTO tableName (`id`, `name`, `age`, `gender`) VALUES
    (1, 'Roberta', 39, 'M'),
    (2, 'Oliver', 25, 'M'),
    (3, 'Shayna', 18, 'F'),
    (4, 'Fechin', 18, 'M');
- 前端方案的架构设计，去网上搜索一下，现在比较合理的一个架构。