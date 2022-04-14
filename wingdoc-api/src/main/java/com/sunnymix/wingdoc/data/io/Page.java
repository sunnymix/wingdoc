package com.sunnymix.wingdoc.data.io;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author sunnymix
 */
@Data
@AllArgsConstructor(staticName = "__")
public class Page {

    private Integer num;

    private Integer size;

    private Boolean next;

    public static Page all() {
        return __(0, Integer.MAX_VALUE, false);
    }

    public static Page list(Integer size) {
        return __(0, size, false);
    }

    public static Page one() {
        return __(0, 1, false);
    }

}
