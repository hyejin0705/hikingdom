package org.lightnsalt.hikingdom.chat.repository.mongo;

import org.lightnsalt.hikingdom.chat.entity.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
}
