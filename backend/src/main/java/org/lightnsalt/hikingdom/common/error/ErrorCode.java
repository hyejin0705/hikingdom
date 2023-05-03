package org.lightnsalt.hikingdom.common.error;

import lombok.Getter;

/**
 * List of possible error codes
 */
@Getter
public enum ErrorCode {

	// common error codes
	INVALID_INPUT_VALUE(400, "C001", "입력값이 유효하지 않습니다"),
	METHOD_NOT_ALLOWED(405, "C002", "지원하지 않는 HTTP 요청 메서드입니다"),
	INTERNAL_SERVER_ERROR(500, "C003", "서버에서 예상치 못한 오류가 발생했습니다"),
	MEMBER_UNAUTHORIZED(401, "C004", "인증 자격 증명이 유효하지 않습니다"),
	INVALID_TOKEN(401, "C005", "토큰이 유효하지 않습니다"),
	EXPIRED_TOKEN(401, "C006", "토큰이 만료되었습니다"),
	MISSING_REQUEST_BODY(400, "C007", "응답 요청 내용이 없습니다"),

	// business error codes //

	// member related error codes
	DUPLICATE_EMAIL(400, "M001", "사용할 수 없는 이메일입니다"),
	DUPLICATE_NICKNAME(400, "M002", "사용할 수 없는 닉네임입니다"),
	MEMBER_NOT_FOUND(404, "M003", "존재하지 않는 사용자입니다"),

	// info related error codes
	DUPLICATED_MOUNTAIN_REGISTER(403, "M001", "이미 등록된 산 이름입니다"),
	MOUNTAIN_NOT_FOUND(404, "M002", "존재하지 않는 데이터입니다"),
	BASE_ADDRESS_NOT_FOUND(404, "L001", "존재하지 않는 지역 정보입니다"),

	// club related error codes
	CLUB_ALREADY_JOINED(400, "K001", "이미 소모임에 가입되어 있습니다"),
	DUPLICATE_CLUB_NAME(400, "K002", "이미 존재하는 소모임 이름입니다"),
	CLUB_NOT_FOUND(404, "K003", "존재하지 않는 소모임입니다"),
	CLUB_MEETUP_NOT_FOUND(404, "KM001", "해당 소모임에 포함된 일정이 아닙니다"),

	// club member related error codes
	CLUB_MEMBER_UNAUTHORIZED(401, "CM001", "소모임에 가입된 회원이 아닙니다"),
	CLUB_MEMBER_NOT_FOUND(404, "CM001", "소모임에 가입된 회원이 아닙니다"),
	CLUB_JOIN_REQUEST_PENDING(400, "CM002", "소모임 가입 요청이 이미 존재합니다"),
	CLUB_JOIN_REQUEST_NOT_FOUND(404, "CM003", "유효한 소모임 가입 요청이 없습니다"),

	// meetup related error codes
	MEETUP_NOT_FOUND(404, "MU001", "존재하지 않는 일정입니다"),
	MEETUP_ALREADY_JOINED(400, "MU002", "이미 참여한 일정입니다"),
	MEETUP_MEMBER_UNAUTHORIZED(401, "MU003", "일정에 가입된 회원이 아닙니다"),

	// meetup photo related error codes
	FAIL_TO_SAVE_PHOTO(500, "MP001", "사진 저장에 실패했습니다"),
	PHOTO_NOT_FOUND(404, "MP002", "삭제되었거나 존재하지 않는 사진입니다"),

	// meetup review related error codes
	MEETUP_REVIEW_NOT_FOUND(404, "MR001", "존재하지 않는 일정 후기입니다");
	private final int status;
	private final String code;
	private final String message;

	ErrorCode(final int status, final String code, final String message) {
		this.status = status;
		this.code = code;
		this.message = message;
	}
}
