package com.sunnymix.doccap.api.controller;

import com.sunnymix.doccap.dao.jooq.tables.pojos.Doc;
import com.sunnymix.doccap.data.info.DocInfo;
import com.sunnymix.doccap.data.io.Out;
import com.sunnymix.doccap.repo.DocRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author sunnymix
 */
@RestController
public class DocController {

    @Autowired
    private DocRepo docRepo;

    @GetMapping("/doc/list")
    public Out<List<DocInfo>> list() {
        Out<List<Doc>> docOut = docRepo.list();
        if (!docOut.getSuccess()) {
            return Out.error(docOut);
        }
        List<DocInfo> docInfoList = docOut.getData().stream().map(DocInfo::__).collect(Collectors.toList());
        return Out.ok(docInfoList, docOut);
    }

}
