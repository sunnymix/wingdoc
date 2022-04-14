package com.sunnymix.wingdoc.api;

import com.sunnymix.wingdoc.data.info.AppInfo;
import com.sunnymix.wingdoc.data.io.Out;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author sunnymix
 */
@SpringBootApplication(scanBasePackages = {Constant.BASE_PACKAGE})
@ConfigurationPropertiesScan({Constant.BASE_PACKAGE})
public class WingdocApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(WingdocApiApplication.class, args);
    }

    @RestController
    public static class AppController {

        @GetMapping("/")
        public Out<AppInfo> info() {
            return Out.ok(AppInfo.__(Constant.APP_NAME));
        }

    }

}
