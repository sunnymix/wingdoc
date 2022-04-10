package com.sunnymix.doccap.api.controller;

import com.sunnymix.doccap.data.Id;
import com.sunnymix.doccap.data.info.DocInfo;
import com.sunnymix.doccap.data.io.Out;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * @author sunnymix
 */
@RestController
public class DocController {

    @PostMapping("/doc/list")
    public static Out<List<DocInfo>> list() {
        return Out.ok(new ArrayList<>() {{
            add(DocInfo.__(Id.newId(), "Doc 1", "Sunny"));
            add(DocInfo.__(Id.newId(), "Doc 2", "Sunny"));
        }});
    }

}
