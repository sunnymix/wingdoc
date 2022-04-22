package com.sunnymix.wingdoc.api.controller;

import com.sunnymix.wingdoc.data.form.DocCreateForm;
import com.sunnymix.wingdoc.data.form.DocUpdateForm;
import com.sunnymix.wingdoc.data.info.DocInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.repo.DocRepo;
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

    // TODO: /doc/list 改成 /doc/list/add

    @PostMapping("/doc/list")
    public Out<DocInfo> add(@RequestBody DocCreateForm form) {
        return docRepo.create(form);
    }

    @GetMapping("/doc/{id}")
    public Out<DocInfo> one(@PathVariable("id") String id) {
        return docRepo.one(id);
    }

    // TODO: /doc/{id} 改成 /doc/{id}/update

    @PostMapping("/doc/{id}")
    public Out<Boolean> update(@PathVariable("id") String id,
                               @RequestBody DocUpdateForm form) {
        return docRepo.update(id, form);
    }

}
