package com.sunnymix.doccap.data.io;

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

}
