package com.sunnymix.doccap.api.controller;

import com.sunnymix.doccap.data.form.BlockCreateForm;
import com.sunnymix.doccap.data.form.BlockUpdateForm;
import com.sunnymix.doccap.data.info.BlockInfo;
import com.sunnymix.doccap.data.io.Out;
import com.sunnymix.doccap.repo.BlockRepo;
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

}
