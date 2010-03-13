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

CREATE INDEX `object_page_id`            on `object`(`page_id`);
CREATE INDEX `object_obj_num`            on `object`(`obj_num`);
CREATE INDEX `object_path`               on `object`(`path`);
CREATE INDEX `object_partial_url_md5`    on `object`(`partial_url_md5`);
CREATE INDEX `object_end_time`           on `object`(`end_time`);
CREATE INDEX `object_host`               on `object`(`host`);
CREATE INDEX `object_err_msg`            on `object`(`err_msg`);
CREATE INDEX `object_domain`             on `object`(`domain`);
CREATE INDEX `object_resolved_ip_addr`   on `object`(`resolved_ip_addr`);
CREATE INDEX `object_time_active`        on `object`(`time_active`);
CREATE INDEX `object_dns_lookup_time`    on `object`(`dns_lookup_time`);
CREATE INDEX `object_ssl_handshake_time` on `object`(`ssl_handshake_time`);
CREATE INDEX `object_connect_time`       on `object`(`connect_time`);
CREATE INDEX `object_blocked_time`       on `object`(`blocked_time`);
CREATE INDEX `object_send_time`          on `object`(`send_time`);
CREATE INDEX `object_wait_time`          on `object`(`wait_time`);
CREATE INDEX `object_receive_time`       on `object`(`receive_time`);
CREATE INDEX `object_method`             on `object`(`method`);
CREATE INDEX `object_protocol`           on `object`(`protocol`);
CREATE INDEX `object_status_code`        on `object`(`status_code`);
CREATE INDEX `object_test_id`            on `object`(`test_id`);
CREATE INDEX `object_start_time`         on `object`(`start_time`);
CREATE INDEX `object_session_id`         on `object`(`session_id`);

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

CREATE INDEX `page_session_id`   on `page`(`session_id`);
CREATE INDEX `page_bytes`        on `page`(`bytes`);
CREATE INDEX `page_obj_count`    on `page`(`obj_count`);
CREATE INDEX `page_start_time`   on `page`(`start_time`);
CREATE INDEX `page_end_time`     on `page`(`end_time`);
CREATE INDEX `page_page`         on `page`(`page`);
CREATE INDEX `page_time_active`  on `page`(`time_active`);
CREATE INDEX `page_test_id`      on `page`(`test_id`);

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

CREATE INDEX `session_bytes`        on `session`(`bytes`);
CREATE INDEX `session_obj_count`    on `session`(`obj_count`);
CREATE INDEX `session_end_time`     on `session`(`end_time`);
CREATE INDEX `session_start_time`   on `session`(`start_time`);
CREATE INDEX `session_page_count`   on `session`(`page_count`);
CREATE INDEX `session_time_active`  on `session`(`time_active`);
CREATE INDEX `session_test_id`      on `session`(`test_id`);



