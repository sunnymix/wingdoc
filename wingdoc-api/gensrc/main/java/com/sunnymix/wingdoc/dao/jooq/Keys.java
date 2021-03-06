/*
 * This file is generated by jOOQ.
 */
package com.sunnymix.wingdoc.dao.jooq;


import com.sunnymix.wingdoc.dao.jooq.tables.Block;
import com.sunnymix.wingdoc.dao.jooq.tables.Doc;
import com.sunnymix.wingdoc.dao.jooq.tables.Mark;
import com.sunnymix.wingdoc.dao.jooq.tables.records.BlockRecord;
import com.sunnymix.wingdoc.dao.jooq.tables.records.DocRecord;
import com.sunnymix.wingdoc.dao.jooq.tables.records.MarkRecord;

import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.Internal;


/**
 * A class modelling foreign key relationships and constraints of tables in
 * wingdoc.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Keys {

    // -------------------------------------------------------------------------
    // UNIQUE and PRIMARY KEY definitions
    // -------------------------------------------------------------------------

    public static final UniqueKey<BlockRecord> KEY_BLOCK_PRIMARY = Internal.createUniqueKey(Block.BLOCK, DSL.name("KEY_block_PRIMARY"), new TableField[] { Block.BLOCK.ID }, true);
    public static final UniqueKey<BlockRecord> KEY_BLOCK_UNQ_DOC_ID_BLOCK_ID = Internal.createUniqueKey(Block.BLOCK, DSL.name("KEY_block_unq_doc_id_block_id"), new TableField[] { Block.BLOCK.DOC_ID, Block.BLOCK.ID }, true);
    public static final UniqueKey<DocRecord> KEY_DOC_PRIMARY = Internal.createUniqueKey(Doc.DOC, DSL.name("KEY_doc_PRIMARY"), new TableField[] { Doc.DOC.ID }, true);
    public static final UniqueKey<MarkRecord> KEY_MARK_PRIMARY = Internal.createUniqueKey(Mark.MARK, DSL.name("KEY_mark_PRIMARY"), new TableField[] { Mark.MARK.ID }, true);
}
