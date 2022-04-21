/*
 * This file is generated by jOOQ.
 */
package com.sunnymix.wingdoc.dao.jooq.tables;


import com.sunnymix.wingdoc.dao.jooq.Keys;
import com.sunnymix.wingdoc.dao.jooq.Wingdoc;
import com.sunnymix.wingdoc.dao.jooq.tables.records.BlockRecord;

import java.util.Arrays;
import java.util.List;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Row7;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.SQLDataType;
import org.jooq.impl.TableImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Block extends TableImpl<BlockRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>wingdoc.block</code>
     */
    public static final Block BLOCK = new Block();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<BlockRecord> getRecordType() {
        return BlockRecord.class;
    }

    /**
     * The column <code>wingdoc.block.id</code>. ID
     */
    public final TableField<BlockRecord, String> ID = createField(DSL.name("id"), SQLDataType.VARCHAR(50).nullable(false).defaultValue(DSL.inline("", SQLDataType.VARCHAR)), this, "ID");

    /**
     * The column <code>wingdoc.block.doc_id</code>. 文档ID
     */
    public final TableField<BlockRecord, String> DOC_ID = createField(DSL.name("doc_id"), SQLDataType.VARCHAR(50).nullable(false).defaultValue(DSL.inline("", SQLDataType.VARCHAR)), this, "文档ID");

    /**
     * The column <code>wingdoc.block.pos</code>. 位置
     */
    public final TableField<BlockRecord, Integer> POS = createField(DSL.name("pos"), SQLDataType.INTEGER.nullable(false).defaultValue(DSL.inline("0", SQLDataType.INTEGER)), this, "位置");

    /**
     * The column <code>wingdoc.block.type</code>. 类型
     */
    public final TableField<BlockRecord, String> TYPE = createField(DSL.name("type"), SQLDataType.VARCHAR(20).nullable(false).defaultValue(DSL.inline("TEXT", SQLDataType.VARCHAR)), this, "类型");

    /**
     * The column <code>wingdoc.block.status</code>. 状态
     */
    public final TableField<BlockRecord, String> STATUS = createField(DSL.name("status"), SQLDataType.VARCHAR(20).nullable(false).defaultValue(DSL.inline("", SQLDataType.VARCHAR)), this, "状态");

    /**
     * The column <code>wingdoc.block.text</code>. 内容
     */
    public final TableField<BlockRecord, String> TEXT = createField(DSL.name("text"), SQLDataType.CLOB.nullable(false), this, "内容");

    /**
     * The column <code>wingdoc.block.link</code>. 链接
     */
    public final TableField<BlockRecord, String> LINK = createField(DSL.name("link"), SQLDataType.VARCHAR(200).nullable(false).defaultValue(DSL.inline("", SQLDataType.VARCHAR)), this, "链接");

    private Block(Name alias, Table<BlockRecord> aliased) {
        this(alias, aliased, null);
    }

    private Block(Name alias, Table<BlockRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>wingdoc.block</code> table reference
     */
    public Block(String alias) {
        this(DSL.name(alias), BLOCK);
    }

    /**
     * Create an aliased <code>wingdoc.block</code> table reference
     */
    public Block(Name alias) {
        this(alias, BLOCK);
    }

    /**
     * Create a <code>wingdoc.block</code> table reference
     */
    public Block() {
        this(DSL.name("block"), null);
    }

    public <O extends Record> Block(Table<O> child, ForeignKey<O, BlockRecord> key) {
        super(child, key, BLOCK);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : Wingdoc.WINGDOC;
    }

    @Override
    public UniqueKey<BlockRecord> getPrimaryKey() {
        return Keys.KEY_BLOCK_PRIMARY;
    }

    @Override
    public List<UniqueKey<BlockRecord>> getUniqueKeys() {
        return Arrays.asList(Keys.KEY_BLOCK_UNQ_DOC_ID_BLOCK_ID);
    }

    @Override
    public Block as(String alias) {
        return new Block(DSL.name(alias), this);
    }

    @Override
    public Block as(Name alias) {
        return new Block(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public Block rename(String name) {
        return new Block(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Block rename(Name name) {
        return new Block(name, null);
    }

    // -------------------------------------------------------------------------
    // Row7 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row7<String, String, Integer, String, String, String, String> fieldsRow() {
        return (Row7) super.fieldsRow();
    }
}
