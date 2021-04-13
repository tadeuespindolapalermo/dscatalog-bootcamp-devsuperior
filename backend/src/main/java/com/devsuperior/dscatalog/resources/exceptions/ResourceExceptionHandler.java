package com.devsuperior.dscatalog.resources.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@ControllerAdvice
public class ResourceExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(ResourceNotFoundException e, HttpServletRequest request) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body((StandardError) getStandardError(e, request, HttpStatus.NOT_FOUND, "Resource not found"));
	}

	@ExceptionHandler(DatabaseException.class)
	public ResponseEntity<StandardError> database(DatabaseException e, HttpServletRequest request) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body((StandardError) getStandardError(e, request, HttpStatus.BAD_REQUEST, "Database exception"));
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ValidationError> validation(MethodArgumentNotValidException e, HttpServletRequest request) {
		return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body((ValidationError) getStandardError(e, request, HttpStatus.UNPROCESSABLE_ENTITY, "Validation exception"));
	}

	private Object getStandardError(Exception e, HttpServletRequest request, HttpStatus status, String error) {		
		ValidationError err = new ValidationError();
		err.setTimestamp(Instant.now());
		err.setStatus(status.value());
		err.setError(error);
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());		
		if (e instanceof MethodArgumentNotValidException) {			
			((MethodArgumentNotValidException) e).getBindingResult().getFieldErrors().forEach(f -> err.addError(f.getField(), f.getDefaultMessage()));
		}		
		return err;
	}

}
