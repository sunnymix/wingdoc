package com.sunnymix.wingdoc.data.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

/**
 * @author sunnymix
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocUpdateForm {

    @Nullable
    private String title;

    @Nullable
    private String author;

}
