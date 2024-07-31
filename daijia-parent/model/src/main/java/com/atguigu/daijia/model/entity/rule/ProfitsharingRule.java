package com.atguigu.daijia.model.entity.rule;

import com.atguigu.daijia.model.entity.base.BaseEntity;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "ProfitsharingRule")
@TableName("profitsharing_rule")
public class ProfitsharingRule extends BaseEntity {

	private static final long serialVersionUID = 1L;

    @Schema(description = "规则名称")
	@TableField("name")
	private String name;

    @Schema(description = "规则代码")
	@TableField("rule")
	private String rule;

    @Schema(description = "状态代码，1有效，2关闭")
	@TableField("status")
	private Integer status;

}