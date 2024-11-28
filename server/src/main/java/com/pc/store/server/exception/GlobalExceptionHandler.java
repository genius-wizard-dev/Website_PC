package com.pc.store.server.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.pc.store.server.dto.request.ApiResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

    //    @ExceptionHandler(value = Exception.class)
    //    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException exception) {
    //        ApiResponse apiResponse = new ApiResponse();
    //
    //        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
    //        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
    //
    //        return ResponseEntity.badRequest().body(apiResponse);
    //    }

    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<ApiResponse> handleRuntimeException(AppException e) {
        ErrorCode errorCode = e.getErrorCode();
        return ResponseEntity.status(errorCode.getHttpStatus())
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }
}