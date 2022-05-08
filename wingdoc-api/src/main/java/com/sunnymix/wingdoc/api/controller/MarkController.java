package com.sunnymix.wingdoc.api.controller;

import com.sunnymix.wingdoc.data.form.MarkAddForm;
import com.sunnymix.wingdoc.data.info.MarkInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.repo.MarkRepo;
import com.sunnymix.wingdoc.service.MarkQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/marks")
    public Out<List<MarkInfo>> getList() {
        return markQueryService.query();
    }

    @PostMapping("/marks")
    public Out<List<MarkInfo>> fetchList() {
        return markQueryService.query();
    }

    @PostMapping("/marks/add")
    public Out<Boolean> add(@RequestBody MarkAddForm form) {
        return markRepo.add(form);
    }

    @DeleteMapping("/marks/{docId}")
    public Out<Boolean> delete(@PathVariable("docId") String docId) {
        return markRepo.delete(docId);
    }

}
