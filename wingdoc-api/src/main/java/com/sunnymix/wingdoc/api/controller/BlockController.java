package com.sunnymix.wingdoc.api.controller;

import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.model.PutObjectRequest;
import com.sunnymix.wingdoc.data.Id;
import com.sunnymix.wingdoc.data.form.BlockCreateForm;
import com.sunnymix.wingdoc.data.form.BlockUpdateForm;
import com.sunnymix.wingdoc.data.info.BlockInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.repo.BlockRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

/**
 * @author sunnymix
 */
@RestController
public class BlockController {

    // --- Autowired:

    @Autowired
    private BlockRepo blockRepo;

    // --- Oss:

    @Value("${oss.endpoint}")
    private String endpoint;

    @Value("${oss.bucket}")
    private String bucket;

    @Value("${oss.basePath}")
    private String basePath;

    @Value("${oss.readPath}")
    private String readPath;

    @Value("${oss.accessKeyId}")
    private String accessKeyId;

    @Value("${oss.accessKeySecret}")
    private String accessKeySecret;

    // --- Public:

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

    @RequestMapping("/block/{id}/img")
    public Out<String> updateImg(@PathVariable("id") String id,
                                 @RequestParam("img") MultipartFile img[]) {
        String savedImg = null;
        if (img.length > 0) {
            String imgFilename = img[0].getOriginalFilename();
            String newImgFilename = Id.randomFilename(imgFilename);
            File dest = new File("/tmp/wingdoc/upload/" + newImgFilename);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            if (dest.exists()) {
                dest.delete();
            }
            try {
                img[0].transferTo(dest);
                _saveImgToOss(dest, newImgFilename);
                savedImg = readPath + newImgFilename;
                blockRepo.update(id, BlockUpdateForm.ofImg(savedImg));
            } catch (Throwable ignored) {
            }
        }
        return savedImg != null ? Out.ok(savedImg) : Out.error();
    }

    @PostMapping("/block/{id}/move-up")
    public Out<Boolean> moveUp(@PathVariable("id") String id) {
        return blockRepo.moveUp(id);
    }

    @PostMapping("/block/{id}/move-down")
    public Out<Boolean> moveDown(@PathVariable("id") String id) {
        return blockRepo.moveDown(id);
    }

    // --- Private:

    private void _saveImgToOss(File file, String newImgFilename) {
        String objectName = basePath + "/" + newImgFilename;
        String filePath = file.getPath();
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        try {
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, objectName, new File(filePath));
            ossClient.putObject(putObjectRequest);
        } catch (OSSException | ClientException ignored) {
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }
    }

}
