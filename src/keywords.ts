const keywords_ = [
  'abort_after_wait',
  'abort',
  'absent',
  'absolute',
  'accent_sensitivity',
  'acceptable_cursopt',
  'acp',
  'action',
  'activation',
  'add',
  'address',
  'admin',
  'aes_128',
  'aes_192',
  'aes_256',
  'affinity',
  'after',
  'aggregate',
  'algorithm',
  'all_constraints',
  'all_errormsgs',
  'all_indexes',
  'all_levels',
  'all_results',
  'all',
  'allow_connections',
  'allow_dup_row',
  'allow_encrypted_value_modifications',
  'allow_page_locks',
  'allow_row_locks',
  'allow_snapshot_isolation',
  'alter',
  'altercolumn',
  'always',
  'and',
  'anonymous',
  'ansi_defaults',
  'ansi_null_default',
  'ansi_null_dflt_off',
  'ansi_null_dflt_on',
  'ansi_nulls',
  'ansi_padding',
  'ansi_warnings',
  'any',
  'appdomain',
  'append',
  'application',
  'apply',
  'arithabort',
  'arithignore',
  'as',
  'asc',
  'assembly',
  'asymmetric',
  'asynchronous_commit',
  'at',
  'atan2',
  'atomic',
  'attach_force_rebuild_log',
  'attach_rebuild_log',
  'attach',
  'audit',
  'auth_realm',
  'authentication',
  'authorization',
  'auto_cleanup',
  'auto_close',
  'auto_create_statistics',
  'auto_shrink',
  'auto_update_statistics_async',
  'auto_update_statistics',
  'auto',
  'automated_backup_preference',
  'automatic',
  'autopilot',
  'availability_mode',
  'availability',
  'backup_priority',
  'backup',
  'base64',
  'basic',
  'batches',
  'batchsize',
  'before',
  'begin',
  'between',
  'bigint',
  'binary',
  'binding',
  'bit',
  'block',
  'blocksize',
  'bmk',
  'break',
  'broker_instance',
  'broker',
  'browse',
  'bucket_count',
  'buffer',
  'buffercount',
  'bulk_logged',
  'bulk',
  'by',
  'call',
  'caller',
  'card',
  'cascade',
  'case',
  'catalog',
  'catch',
  'cert',
  'certificate',
  'change_retention',
  'change_tracking_context',
  'change_tracking',
  'changes',
  'char',
  'character_set',
  'character',
  'check_expiration',
  'check_policy',
  'check',
  'checkconstraints',
  'checkindex',
  'checkpoint',
  'cleanup_policy',
  'clear_port',
  'clear',
  'close',
  'clustered',
  'coalesce',
  'codepage',
  'collate',
  'collection',
  'column_encryption_key',
  'column_master_key',
  'column',
  'columnstore_archive',
  'columnstore',
  'colv_100_to_80',
  'colv_80_to_100',
  'commit_differential_base',
  'commit',
  'committed',
  'compatibility_level',
  'compress_all_row_groups',
  'compression_delay',
  'compression',
  'compute',
  'concat_null_yields_null',
  'concatenate',
  'configuration',
  'connect',
  'constraint',
  'contains',
  'containstable',
  'continue_after_error',
  'continue',
  'contract_name',
  'contract',
  'control',
  'conversation_group_id',
  'conversation_handle',
  'conversation',
  'convert',
  'copy_only',
  'copy',
  'count_rows',
  'counter',
  'create',
  'credential',
  'cross',
  'cryptographic_provider',
  'cryptographic',
  'cube',
  'current_date',
  'current_time',
  'current_timestamp',
  'current_user',
  'current',
  'cursor_close_on_commit',
  'cursor_default',
  'cursor',
  'data_compression',
  'data_flush_interval_seconds',
  'data_mirroring',
  'data_purity',
  'data_source',
  'data',
  'database_name',
  'database_snapshot',
  'database',
  'datafiletype',
  'date_correlation_optimization',
  'date_format',
  'date',
  'datefirst',
  'dateformat',
  'datetime',
  'datetime2',
  'datetimeoffset',
  'days',
  'db_chaining',
  'dbcc',
  'dbid',
  'dbidexec',
  'dbo_only',
  'deadlock_priority',
  'deallocate',
  'dec',
  'decimal',
  'declare',
  'decrypt_a',
  'decrypt',
  'decryption',
  'default_database',
  'default_language',
  'default_logon_domain',
  'default_schema',
  'default',
  'definition',
  'delay',
  'delayed_durability',
  'delete',
  'delimitedtext',
  'density_vector',
  'deny',
  'dependent',
  'des',
  'desc',
  'description',
  'desired_state',
  'desx',
  'differential',
  'digest',
  'disable_broker',
  'disable_def_cnst_chk',
  'disable',
  'disabled',
  'disk',
  'distinct',
  'distributed',
  'distribution',
  'double',
  'drop_existing',
  'drop',
  'dts_buffers',
  'dump',
  'durability',
  'dynamic',
  'edition',
  'elements',
  'else',
  'emergency',
  'empty',
  'enable_broker',
  'enable',
  'enabled',
  'encoding',
  'encrypted_value',
  'encrypted',
  'encryption_type',
  'encryption',
  'end',
  'endpoint_url',
  'endpoint',
  'enhancedintegrity',
  'entry',
  'errlvl',
  'error_broker_conversations',
  'errorfile',
  'escape',
  'estimateonly',
  'event',
  'except',
  'exec',
  'executable',
  'execute',
  'exists',
  'exit',
  'expand',
  'expiredate',
  'expiry_date',
  'explicit',
  'external_access',
  'external',
  'failover_mode',
  'failover',
  'failure_condition_level',
  'fast_forward',
  'fast',
  'fastfirstrow',
  'federated_service_account',
  'fetch',
  'field_terminator',
  'fieldterminator',
  'file_format',
  'file',
  'filegroup',
  'filelistonly',
  'filename',
  'filestream_log',
  'filestream_on',
  'filestream',
  'filetable',
  'fillfactor',
  'filter',
  'fips_flagger',
  'fire_triggers',
  'first_row',
  'first',
  'firstrow',
  'float',
  'flush_interval_seconds',
  'fmtonly',
  'following',
  'for',
  'force_failover_allow_data_loss',
  'force_service_allow_data_loss',
  'force',
  'forced',
  'forceplan',
  'foreign',
  'format_options',
  'format_type',
  'formatfile',
  'formsof',
  'forward_only',
  'free_cursors',
  'free_exec_context',
  'freetext',
  'freetexttable',
  'from',
  'full',
  'fullscan',
  'fulltext',
  'fulltextall',
  'fulltextkey',
  'function',
  'generated',
  'geography',
  'geometry',
  'get',
  'global',
  'go',
  'goto',
  'governor',
  'grant',
  'group',
  'guid',
  'hadoop',
  'hardening',
  'hash',
  'hashed',
  'having',
  'header_limit',
  'headeronly',
  'health_check_timeout',
  'hidden',
  'hierarchyid',
  'histogram_steps',
  'histogram',
  'hits_cursors',
  'hits_exec_context',
  'holdlock',
  'hours',
  'http',
  'identity_insert',
  'identity_value',
  'identity',
  'identitycol',
  'if',
  'ifnull',
  'ignore_constraints',
  'ignore_dup_key',
  'ignore_dup_row',
  'ignore_triggers',
  'image',
  'immediate',
  'implicit_transactions',
  'in',
  'include_null_values',
  'include',
  'index',
  'inflectional',
  'init',
  'initiator',
  'inner',
  'insensitive',
  'insert',
  'instead',
  'int',
  'integer',
  'integrated',
  'intermediate',
  'intersect',
  'interval_length_minutes',
  'into',
  'inuse_cursors',
  'inuse_exec_context',
  'io',
  'is',
  'isabout',
  'iso_week',
  'isolation',
  'job_tracker_location',
  'join',
  'json',
  'keep_nulls',
  'keep_replication',
  'keep',
  'keepdefaults',
  'keepfixed',
  'keepidentity',
  'keepnulls',
  'kerberos',
  'key_path',
  'key_source',
  'key_store_provider_name',
  'key',
  'keyset',
  'kill',
  'kilobytes_per_batch',
  'label',
  'labelonly',
  'langid',
  'language',
  'last',
  'lastrow',
  'left',
  'legacy_cardinality_estimation',
  'length',
  'level',
  'lifetime',
  'like',
  'lineage_100_to_80',
  'lineage_80_to_100',
  'lineno',
  'listener_ip',
  'listener_port',
  'load',
  'loadhistory',
  'lob_compaction',
  'local_service_name',
  'local',
  'locate',
  'location',
  'lock_escalation',
  'lock_timeout',
  'lockres',
  'login_type',
  'login',
  'loop',
  'manual',
  'mark_in_use_for_removal',
  'masked',
  'master',
  'matched',
  'max_duration',
  'max_outstanding_io_per_volume',
  'max_plans_per_query',
  'max_queue_readers',
  'max_storage_size_mb',
  'maxdop',
  'maxerrors',
  'maxlength',
  'maxtransfersize',
  'mediadescription',
  'medianame',
  'mediapassword',
  'memogroup',
  'memory_optimized',
  'merge',
  'message_forward_size',
  'message_forwarding',
  'message',
  'microsecond',
  'millisecond',
  'minutes',
  'mirror_address',
  'misses_cursors',
  'misses_exec_context',
  'mixed',
  'modify',
  'money',
  'move',
  'multi_user',
  'must_change',
  'name',
  'namespace',
  'nanosecond',
  'national',
  'native_compilation',
  'native',
  'nchar',
  'ncharacter',
  'never',
  'new_account',
  'new_broker',
  'newname',
  'next',
  'no_browsetable',
  'no_checksum',
  'no_compression',
  'no_infomsgs',
  'no_triggers',
  'no_truncate',
  'no',
  'nocheck',
  'nocount',
  'noexec',
  'noexpand',
  'noformat',
  'noinit',
  'nolock',
  'nonatomic',
  'nonclustered',
  'nondurable',
  'none',
  'norecompute',
  'norecovery',
  'noreset',
  'norewind',
  'noskip',
  'not',
  'notification',
  'nounload',
  'now',
  'nowait',
  'ntext',
  'ntlm',
  'null',
  'nullif',
  'numeric_roundabort',
  'numeric',
  'nvarchar',
  'object',
  'objid',
  'oem',
  'of',
  'off',
  'offline',
  'offsets',
  'old_account',
  'on',
  'online',
  'open',
  'opendatasource',
  'openjson',
  'openquery',
  'openrowset',
  'openxml',
  'operation_mode',
  'optimistic',
  'option',
  'or',
  'orc',
  'order',
  'out',
  'outer',
  'output',
  'over',
  'override',
  'owner',
  'ownership',
  'pad_index',
  'page_checksum',
  'page_verify',
  'page',
  'pagecount',
  'paglock',
  'param',
  'parameter_sniffing',
  'parameter_type_expansion',
  'parameterization',
  'parquet',
  'parseonly',
  'partial',
  'partition',
  'partner',
  'password',
  'path',
  'pause',
  'percent',
  'percentage',
  'period',
  'permission_set',
  'persisted',
  'physical_only',
  'pivot',
  'plan_forcing_mode',
  'plan',
  'policy',
  'pool',
  'population',
  'ports',
  'preceding',
  'precision',
  'predicate',
  'presume_abort',
  'primary_role',
  'primary',
  'print',
  'prior',
  'priority_level',
  'priority',
  'private',
  'proc',
  'procedure_name',
  'procedure',
  'profile',
  'provider',
  'public',
  'query_capture_mode',
  'query_governor_cost_limit',
  'query_optimizer_hotfixes',
  'query_store',
  'queue',
  'quoted_identifier',
  'raiserror',
  'range',
  'raw',
  'rc2',
  'rc4_128',
  'rc4',
  'rcfile',
  'rdbms',
  'read_committed_snapshot',
  'read_only',
  'read_write',
  'read',
  'readcommitted',
  'readcommittedlock',
  'readonly',
  'readpast',
  'readtext',
  'readuncommitted',
  'readwrite',
  'real',
  'rebuild',
  'receive',
  'recmodel_70backcomp',
  'recompile',
  'reconfigure',
  'recovery',
  'recursive_triggers',
  'recursive',
  'redo_queue',
  'references',
  'reject_sample_value',
  'reject_type',
  'reject_value',
  'relative',
  'remote_data_archive',
  'remote_proc_transactions',
  'remote_service_name',
  'remote',
  'remove',
  'removed_cursors',
  'removed_exec_context',
  'reorganize',
  'repeat',
  'repeatable',
  'repeatableread',
  'replica',
  'replicated',
  'replication',
  'replnick_100_to_80',
  'replnickarray_100_to_80',
  'replnickarray_80_to_100',
  'required_cursopt',
  'required',
  'resample',
  'reset',
  'resource_manager_location',
  'resource',
  'restart',
  'restore',
  'restrict',
  'restricted_user',
  'resume',
  'retaindays',
  'retention',
  'return',
  'returns',
  'revert',
  'revoke',
  'rewind',
  'rewindonly',
  'right',
  'robust',
  'role',
  'rollback',
  'rollup',
  'root',
  'round_robin',
  'route',
  'row_terminator',
  'row',
  'rowcount',
  'rowdump',
  'rowguidcol',
  'rowlock',
  'rows_per_batch',
  'rows',
  'rowsets_only',
  'rowterminator',
  'rowversion',
  'rsa_1024',
  'rsa_2048',
  'rsa_3072',
  'rsa_4096',
  'rsa_512',
  'rule',
  'safe',
  'safety',
  'sample',
  'save',
  'schema',
  'schemabinding',
  'scoped',
  'scroll_locks',
  'scroll',
  'sddl',
  'secexpr',
  'secondary_only',
  'secondary_role',
  'secondary',
  'secret',
  'security',
  'securityaudit',
  'select',
  'selective',
  'self',
  'semantickeyphrasetable',
  'semanticsimilaritydetailstable',
  'semanticsimilaritytable',
  'send',
  'sent',
  'sequence',
  'serde_method',
  'serializable',
  'server',
  'service_broker',
  'service_name',
  'service_objective',
  'service',
  'session_timeout',
  'session_user',
  'session',
  'sessions',
  'set',
  'seterror',
  'setopts',
  'sets',
  'setuser',
  'shard_map_manager',
  'shard_map_name',
  'sharded',
  'shared_memory',
  'show_statistics',
  'showplan_all',
  'showplan_text',
  'showplan_xml_with_recompile',
  'showplan_xml',
  'shrinkdb',
  'shutdown',
  'sid',
  'signature',
  'simple',
  'single_blob',
  'single_clob',
  'single_nclob',
  'single_user',
  'singleton',
  'site',
  'size_based_cleanup_mode',
  'skip',
  'smalldatetime',
  'smallint',
  'smallmoney',
  'snapshot_import',
  'snapshot',
  'snapshotrestorephase',
  'soap',
  'softnuma',
  'some',
  'sort_in_tempdb',
  'sorted_data_reorg',
  'sorted_data',
  'source',
  'spatial',
  'sql_bigint',
  'sql_binary',
  'sql_bit',
  'sql_char',
  'sql_date',
  'sql_decimal',
  'sql_double',
  'sql_float',
  'sql_guid',
  'sql_handle',
  'sql_longvarbinary',
  'sql_longvarchar',
  'sql_numeric',
  'sql_real',
  'sql_smallint',
  'sql_time',
  'sql_timestamp',
  'sql_tinyint',
  'sql_tsi_day',
  'sql_tsi_frac_second',
  'sql_tsi_hour',
  'sql_tsi_minute',
  'sql_tsi_month',
  'sql_tsi_quarter',
  'sql_tsi_second',
  'sql_tsi_week',
  'sql_tsi_year',
  'sql_type_date',
  'sql_type_time',
  'sql_type_timestamp',
  'sql_varbinary',
  'sql_varchar',
  'sql_variant',
  'sql_wchar',
  'sql_wlongvarchar',
  'sql',
  'ssl_port',
  'ssl',
  'standard',
  'standby',
  'start_date',
  'start',
  'started',
  'stat_header',
  'state',
  'statement',
  'static',
  'statistics_incremental',
  'statistics_norecompute',
  'statistics_only',
  'statistics',
  'statman',
  'stats_stream',
  'status',
  'stop_on_error',
  'stop',
  'stopat',
  'stopatmark',
  'stopbeforemark',
  'stoplist',
  'stopped',
  'string_delimiter',
  'subject',
  'supplemental_logging',
  'supported',
  'suspend',
  'symmetric',
  'synchronous_commit',
  'synonym',
  'sysname',
  'system_time',
  'system_user',
  'system_versioning',
  'system',
  'table',
  'tableresults',
  'tablesample',
  'tablock',
  'tablockx',
  'take',
  'tape',
  'target_index',
  'target_partition',
  'target',
  'tcp',
  'temporal_history_retention',
  'text',
  'textimage_on',
  'textsize',
  'then',
  'thesaurus',
  'throw',
  'time',
  'timeout',
  'timestamp',
  'tinyint',
  'to',
  'top',
  'torn_page_detection',
  'track_columns_updated',
  'tran',
  'transaction',
  'transfer',
  'trigger',
  'triple_des_3key',
  'triple_des',
  'truncate',
  'trustworthy',
  'try_convert',
  'try',
  'tsequal',
  'tsql',
  'type_desc',
  'type_warning',
  'type',
  'tzoffset',
  'uid',
  'unbounded',
  'uncommitted',
  'union',
  'unique',
  'uniqueidentifier',
  'unlimited',
  'unload',
  'unlock',
  'unpivot',
  'unsafe',
  'update',
  'updatetext',
  'updlock',
  'url',
  'use_type_default',
  'use',
  'useplan',
  'user',
  'useroptions',
  'using',
  'utcdatetime',
  'valid_xml',
  'validation',
  'value',
  'values',
  'varbinary',
  'varchar',
  'varying',
  'verbose',
  'verifyonly',
  'version',
  'view_metadata',
  'view',
  'virtual_device',
  'visiblity',
  'waitfor',
  'webmethod',
  'weekday',
  'weight',
  'well_formed_xml',
  'when',
  'where',
  'while',
  'widechar_ansi',
  'widechar',
  'widenative',
  'windows',
  'with',
  'within',
  'without_array_wrapper',
  'without',
  'witness',
  'workload',
  'writetext',
  'wsdl',
  'xact_abort',
  'xlock',
  'xml',
  'xmlschema',
  'xquery',
  'xsinil',
  'zone'
]

/** An array of MSSQL keywords. */
const keywords: Record<string, undefined | true> =
  keywords_.reduce((r, _) => ({ ...r, [_]: true }), {})

export default keywords
