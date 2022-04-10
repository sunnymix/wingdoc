package com.sunnymix.doccap.data.info;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

/**
 * @author sunnymix
 */
@Data
@RequiredArgsConstructor(staticName = "__")
public class DocInfo {

    @NonNull
    private String id;

    @NonNull
    private String title;

    @NonNull
    private String author;

}
