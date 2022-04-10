package com.sunnymix.doccap.data.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

/**
 * @author sunnymix
 */
@Data
@RequiredArgsConstructor(staticName = "__")
@AllArgsConstructor(staticName = "__")
public class Out<T> {

    @NonNull
    private Boolean success;

    @NonNull
    private Page page;

    private T data;

    private String code;

    private String msg;

    public static <T> Out<T> ok() {
        return __(true, Page.all());
    }

    public static <T> Out<T> ok(T data) {
        return __(true, Page.all(), data, null, null);
    }

    public static <T> Out<T> ok(Page page, T data) {
        return __(true, page, data, null, null);
    }

    public static <T> Out<T> error() {
        return __(false, Page.all(), null, "1", "server error");
    }

    public static <T> Out<T> error(String code, String msg) {
        return __(false, Page.all(), null, code, msg);
    }

}
