package org.lightnsalt.hikingdom.domain.hiking.entity;

import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vladmihalcea.hibernate.type.json.JsonStringType;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@TypeDef(name = "json", typeClass = JsonStringType.class)
@Table(name = "member_hiking_gps")
public class MemberHikingGps {
	@Id
	private Long id;

	@ToString.Exclude
	@JsonIgnore
	@MapsId
	@OneToOne
	@JoinColumn(name = "id", columnDefinition = "BIGINT UNSIGNED")
	private MemberHiking hiking;

	@Type(type = "json")
	@Column(name = "gps_route", nullable = false, columnDefinition = "JSON")
	private Map<String, Object> gpsRoute;

	@Builder
	public MemberHikingGps(MemberHiking hiking, Map<String, Object> gpsRoute) {
		this.hiking = hiking;
		this.gpsRoute = gpsRoute;
	}
}