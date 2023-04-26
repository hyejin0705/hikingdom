package org.lightnsalt.hikingdom.domain.info.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
@ToString
@Table(name = "mountain_info")
public class MountainInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	// TODO: add Asset
	@Column(length = 20, nullable = false)
	private String name;
	@Column(nullable = false)
	private String description;
	@Column(length = 200, nullable = false)
	private String address;
	@Column(name = "max_alt", nullable = false)
	private double maxAlt;
	@Column(name = "top_lat", nullable = false)
	private double topLat;
	@Column(name = "top_lng", nullable = false)
	private double topLng;
	@Column(name = "total_duration", columnDefinition = "unsigned int", nullable = false)
	private int totalDuration;
	@Column(name = "img_url", length = 512)
	private String imgUrl;
}
