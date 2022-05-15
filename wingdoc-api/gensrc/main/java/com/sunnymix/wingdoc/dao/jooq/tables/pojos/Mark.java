/*
 * This file is generated by jOOQ.
 */
package com.sunnymix.wingdoc.dao.jooq.tables.pojos;


import java.io.Serializable;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Mark implements Serializable {

    private static final long serialVersionUID = 1L;

    private final Integer id;
    private final String  docId;
    private final Integer pin;

    public Mark(Mark value) {
        this.id = value.id;
        this.docId = value.docId;
        this.pin = value.pin;
    }

    public Mark(
        Integer id,
        String  docId,
        Integer pin
    ) {
        this.id = id;
        this.docId = docId;
        this.pin = pin;
    }

    /**
     * Getter for <code>wingdoc.mark.id</code>.
     */
    public Integer getId() {
        return this.id;
    }

    /**
     * Getter for <code>wingdoc.mark.doc_id</code>. 文档ID
     */
    public String getDocId() {
        return this.docId;
    }

    /**
     * Getter for <code>wingdoc.mark.pin</code>.
     */
    public Integer getPin() {
        return this.pin;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Mark (");

        sb.append(id);
        sb.append(", ").append(docId);
        sb.append(", ").append(pin);

        sb.append(")");
        return sb.toString();
    }
}
