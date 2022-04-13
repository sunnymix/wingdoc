package com.sunnymix.doccap.api.controller;

import com.sunnymix.doccap.data.form.DocCreateForm;
import com.sunnymix.doccap.data.info.DocInfo;
import com.sunnymix.doccap.data.io.Out;
import com.sunnymix.doccap.repo.DocRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author sunnymix
 */
@RestController
@SuppressWarnings("all")
public class DocController {

    @Autowired
    private DocRepo docRepo;

    @GetMapping("/doc/list")
    public Out<List<DocInfo>> list() {
        return docRepo.list();
    }

    @PostMapping("/doc/list")
    public Out<DocInfo> add(@RequestBody DocCreateForm form) {
        return docRepo.create(form);
    }

    @GetMapping("/doc/{id}")
    public Out<DocInfo> one(@PathVariable("id") String id) {
        return docRepo.one(id);
    }

}
