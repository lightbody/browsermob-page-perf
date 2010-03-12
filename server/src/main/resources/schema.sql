CREATE TABLE `object` (
  `bytes` int(10) unsigned NOT NULL,
  `domain` varchar(255) NOT NULL,
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `err_msg` varchar(255) DEFAULT NULL,
  `host` varchar(255) NOT NULL,
  `method` varchar(16) DEFAULT NULL,
  `obj_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `obj_num` mediumint(4) unsigned NOT NULL,
  `path` varchar(4096) NOT NULL,
  `partial_url_md5` varchar(32) NOT NULL,
  `protocol` varchar(16) NOT NULL,
  `resolved_ip_addr` varchar(255) DEFAULT NULL,
  `start_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status_code` smallint(4) NOT NULL,
  `page_id` int(8) unsigned NOT NULL,
  `time_active` mediumint(6) unsigned DEFAULT NULL,
  `session_id` int(8) unsigned DEFAULT NULL,
  `url` varchar(4096) NOT NULL,
  `ssl_handshake_time` mediumint(6) unsigned DEFAULT NULL,
  `dns_lookup_time` mediumint(6) unsigned DEFAULT NULL,
  `connect_time` mediumint(6) unsigned DEFAULT NULL,
  `blocked_time` mediumint(6) unsigned DEFAULT NULL,
  `send_time` mediumint(6) unsigned DEFAULT NULL,
  `wait_time` mediumint(6) unsigned DEFAULT NULL,
  `receive_time` mediumint(6) unsigned DEFAULT NULL,
  `test_id` varchar(36) NOT NULL,
  PRIMARY KEY (`obj_id`)
);


CREATE TABLE `page` (
  `bytes` int(10) unsigned NOT NULL,
  `obj_count` mediumint(4) unsigned NOT NULL,
  `page` smallint(2) unsigned NOT NULL,
  `page_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `time_active` mediumint(6) unsigned DEFAULT NULL,
  `on_content_load` mediumint(6) unsigned DEFAULT NULL,
  `on_load` mediumint(6) unsigned DEFAULT NULL,
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `start_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `title` varchar(512) DEFAULT NULL,
  `session_id` int(8) unsigned NOT NULL,
  `test_id` varchar(36) NOT NULL,
  PRIMARY KEY (`page_id`)
);


CREATE TABLE `session` (
  `bytes` int(10) unsigned NOT NULL,
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `obj_count` mediumint(4) unsigned NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `page_count` mediumint(4) unsigned NOT NULL,
  `time_active` mediumint(6) unsigned DEFAULT NULL,
  `session_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `test_id` varchar(36) NOT NULL,
  PRIMARY KEY (`session_id`)
);


