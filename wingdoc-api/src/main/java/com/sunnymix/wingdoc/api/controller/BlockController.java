package com.sunnymix.wingdoc.api.controller;

import com.sunnymix.wingdoc.data.form.BlockCreateForm;
import com.sunnymix.wingdoc.data.form.BlockUpdateForm;
import com.sunnymix.wingdoc.data.info.BlockInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.repo.BlockRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author sunnymix
 */
@RestController
public class BlockController {

    @Autowired
    private BlockRepo blockRepo;

    @GetMapping("/block/list/{docId}")
    public Out<List<BlockInfo>> getBlockListOfDoc(@PathVariable("docId") String docId) {
        return blockRepo.list(docId);
    }

    @PostMapping("/block/list/{docId}")
    public Out<BlockInfo> addBlockToDoc(@PathVariable("docId") String docId,
                                        @RequestBody BlockCreateForm form) {
        return blockRepo.create(docId, form);
    }

    @PostMapping("/block/{id}")
    public Out<Boolean> update(@PathVariable("id") String id,
                               @RequestBody BlockUpdateForm form) {
        return blockRepo.update(id, form);
    }

    @DeleteMapping("/block/{id}")
    public Out<Boolean> delete(@PathVariable("id") String id) {
        return blockRepo.delete(id);
    }

    @PostMapping("/block/{id}/move-up")
    public Out<Boolean> moveUp(@PathVariable("id") String id) {
        return blockRepo.moveUp(id);
    }

    @PostMapping("/block/{id}/move-down")
    public Out<Boolean> moveDown(@PathVariable("id") String id) {
        return blockRepo.moveDown(id);
    }

}
