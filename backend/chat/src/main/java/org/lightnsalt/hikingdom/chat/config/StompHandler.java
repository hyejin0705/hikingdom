package org.lightnsalt.hikingdom.chat.config;

import java.util.Objects;

import org.lightnsalt.hikingdom.common.util.JwtTokenUtil;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {
	private final JwtTokenUtil jwtTokenUtil;

	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		log.info("message:" + message);
		log.info("headers : " + message.getHeaders());
		log.info("token" + accessor.getNativeHeader("Authorization"));

		if (StompCommand.CONNECT.equals(accessor.getCommand())) {
			jwtTokenUtil.resolveToken(
				Objects.requireNonNull(accessor.getFirstNativeHeader("Authorization")).substring(7));
		}
		return message;
	}
}
