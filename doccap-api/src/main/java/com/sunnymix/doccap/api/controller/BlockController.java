package com.sunnymix.doccap.api.controller;

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
    public Out<List<BlockInfo>> listByDoc(@PathVariable("docId") String docId) {
        return blockRepo.list(docId);
    }

    @PostMapping("/block/{id}")
    public Out<BlockInfo> update(@PathVariable("id") String id,
                                 @RequestBody BlockUpdateForm form) {
        return blockRepo.update(id, form);
    }

}
