package com.sunnymix.wingdoc.data;

import com.sunnymix.wingdoc.common.Strings;

import java.util.Random;
import java.util.UUID;

/**
 * @author sunnymix
 */
public class Id {

    public static final int length = 12;

    public static String newId() {
        int start = new Random().nextInt(32 - length);
        return UUID
                .randomUUID().toString().replace("-", "")
                .substring(start, start + length)
                .toLowerCase();
    }

    public static String randomFilename(String filename) {
        if (Strings.isEmpty(filename)) {
            return filename;
        }
        int dotIndex = filename.lastIndexOf(".");
        if (dotIndex > 0) {
            String name = filename.substring(0, dotIndex);
            String extension = filename.substring(dotIndex);
            return String.format("%s--%s%s", name, newId(), extension);
        }
        return filename;
    }

}
