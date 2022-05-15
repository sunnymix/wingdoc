package com.sunnymix.wingdoc.api.controller;

import com.sunnymix.wingdoc.data.info.MarkInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.repo.MarkRepo;
import com.sunnymix.wingdoc.service.MarkQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author sunnymix
 */
@RestController
@SuppressWarnings("all")
public class MarkController {

    @Autowired
    private MarkRepo markRepo;

    @Autowired
    private MarkQueryService markQueryService;

    @PostMapping("/mark/query")
    public Out<List<MarkInfo>> query() {
        return markQueryService.query();
    }

    @PostMapping("/mark/{docId}/add")
    public Out<Boolean> add(@PathVariable("docId") String docId) {
        return markRepo.add(docId);
    }

    @PostMapping("/mark/{docId}/pin")
    public Out<Boolean> pin(@PathVariable("docId") String docId) {
        return markRepo.pin(docId);
    }

    @PostMapping("/mark/{docId}/unpin")
    public Out<Boolean> unpin(@PathVariable("docId") String docId) {
        return markRepo.unpin(docId);
    }

    @PostMapping("/mark/{docId}/delete")
    public Out<Boolean> delete(@PathVariable("docId") String docId) {
        return markRepo.delete(docId);
    }

}
