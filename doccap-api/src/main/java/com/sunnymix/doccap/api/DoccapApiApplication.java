package com.sunnymix.doccap.api;

import com.sunnymix.doccap.data.info.AppInfo;
import com.sunnymix.doccap.data.io.Out;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.sunnymix.doccap.api.Constant.APP_NAME;
import static com.sunnymix.doccap.api.Constant.BASE_PACKAGE;

/**
 * @author sunnymix
 */
@SpringBootApplication(scanBasePackages = {BASE_PACKAGE})
@ConfigurationPropertiesScan({BASE_PACKAGE})
public class DoccapApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(DoccapApiApplication.class, args);
    }

    @RestController
    public static class AppController {

        @GetMapping("/")
        public Out<AppInfo> info() {
            return Out.ok(AppInfo.__(APP_NAME));
        }

    }

}
