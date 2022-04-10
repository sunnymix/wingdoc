/*
 * This file is generated by jOOQ.
 */
package com.sunnymix.doccap.dao.jooq.tables.records;


import com.sunnymix.doccap.dao.jooq.tables.Doc;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record3;
import org.jooq.Row3;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class DocRecord extends UpdatableRecordImpl<DocRecord> implements Record3<String, String, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>doccap.doc.id</code>. ID
     */
    public DocRecord setId(String value) {
        set(0, value);
        return this;
    }

    /**
     * Getter for <code>doccap.doc.id</code>. ID
     */
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>doccap.doc.title</code>. 标题
     */
    public DocRecord setTitle(String value) {
        set(1, value);
        return this;
    }

    /**
     * Getter for <code>doccap.doc.title</code>. 标题
     */
    public String getTitle() {
        return (String) get(1);
    }

    /**
     * Setter for <code>doccap.doc.author</code>. 作者
     */
    public DocRecord setAuthor(String value) {
        set(2, value);
        return this;
    }

    /**
     * Getter for <code>doccap.doc.author</code>. 作者
     */
    public String getAuthor() {
        return (String) get(2);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record3 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row3<String, String, String> fieldsRow() {
        return (Row3) super.fieldsRow();
    }

    @Override
    public Row3<String, String, String> valuesRow() {
        return (Row3) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return Doc.DOC.ID;
    }

    @Override
    public Field<String> field2() {
        return Doc.DOC.TITLE;
    }

    @Override
    public Field<String> field3() {
        return Doc.DOC.AUTHOR;
    }

    @Override
    public String component1() {
        return getId();
    }

    @Override
    public String component2() {
        return getTitle();
    }

    @Override
    public String component3() {
        return getAuthor();
    }

    @Override
    public String value1() {
        return getId();
    }

    @Override
    public String value2() {
        return getTitle();
    }

    @Override
    public String value3() {
        return getAuthor();
    }

    @Override
    public DocRecord value1(String value) {
        setId(value);
        return this;
    }

    @Override
    public DocRecord value2(String value) {
        setTitle(value);
        return this;
    }

    @Override
    public DocRecord value3(String value) {
        setAuthor(value);
        return this;
    }

    @Override
    public DocRecord values(String value1, String value2, String value3) {
        value1(value1);
        value2(value2);
        value3(value3);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached DocRecord
     */
    public DocRecord() {
        super(Doc.DOC);
    }

    /**
     * Create a detached, initialised DocRecord
     */
    public DocRecord(String id, String title, String author) {
        super(Doc.DOC);

        setId(id);
        setTitle(title);
        setAuthor(author);
    }

    /**
     * Create a detached, initialised DocRecord
     */
    public DocRecord(com.sunnymix.doccap.dao.jooq.tables.pojos.Doc value) {
        super(Doc.DOC);

        if (value != null) {
            setId(value.getId());
            setTitle(value.getTitle());
            setAuthor(value.getAuthor());
        }
    }
}
