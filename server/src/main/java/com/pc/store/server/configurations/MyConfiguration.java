package com.pc.store.server.configurations;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class MyConfiguration {

    @Autowired
    private Environment env;

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ObjectId.class, new ToStringSerializer());
        mapper.registerModule(module);
        return mapper;
    }

    @Bean
    public Cloudinary cloudinary() {
        String secretKey = env.getProperty("API_SECRET");
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dyj2mpgxi",
                "api_key", "614334546396329",
                "api_secret", "l-ud5nFPzA1tldYzJ58mOKLIL4k"));
    }
}
