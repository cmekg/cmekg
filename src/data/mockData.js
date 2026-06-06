// src/data/mockData.js
// 抗肿瘤静脉给药知识图谱数据

// ==================== 图谱颜色配置 ====================
export const graphColors = {
    level1: "#E74C3C",   // 一级菜单 - 红色
    level2: "#3498DB",   // 二级菜单 - 蓝色
    level3: "#F39C12"    // 三级药物 - 橙色
}

// ==================== 左侧菜单配置（数据源） ====================
export const leftMenuConfig = [
    {
        key: "definition",
        label: "定义",
        children: [],
        content: {
            type: "static",
            value: "通过细胞杀伤、免疫调控、内分泌调节等途径，在细胞、分子水平进行作用，达到抑制肿瘤生长或消除肿瘤的药物"
        }
    },
    {
        key: "operation",
        label: "操作要点",
        children: [],
        content: {
            type: "drugDetail",
            detail: {
                "再次双人核对": "",
                "遵循 WS/T 433—2023、T/CNAS 33—2023 的规定进行血管通路的建立、使用及维护。": "",
                "使用全密闭式输注系统进行抗肿瘤药物的输注。": "",
                "给药前后根据药物性质选择 0.9 %氯化钠注射液或 5 %葡萄糖注射液冲管。": "",
                "遵医嘱完成预防性用药。": "",
                "根据药品说明书、治疗方案及药物相互作用原则行给药顺序及给药间隔。": "",
                "根据医嘱、药品说明书及患者耐受情况，调节药物输注速度。": "",
                "使用中心静脉血管通路进行抗肿瘤药物给药时，应执行：":
                    "• 回抽血液确认导管在静脉管腔内<br>" +
                    "• 评估导管有无脱出、移位，输液港注射座有无翻转、外露<br>" +
                    "• 评估穿刺区域及沿血管走向的皮肤有无疼痛、发红、肿胀、烧灼感等<br>" +
                    "• 推注发疱性抗肿瘤药物时，每推注 2～5 ml 药液，应评估并确认静脉回血<br>",
                "发现药物外渗时应立即停止给药，并遵循 T/CNAS 05—2019 及药品说明书进行处理":
                    "• 生命体征，并遵医嘱使用心电监护<br>" +
                    "• 过敏症状，如皮疹、瘙痒、胸闷、呼吸困难等<br>" +
                    "• 其他输液反应，如心慌、出汗、寒战、发热等<br>" +
                    "• 消化道反应，如恶心、呕吐及呕吐物的颜色、性质、量、次数<br>" +
                    "• 体液平衡情况，包括摄入量（进食、饮水情况）及大小便情况（颜色、性质、量）<br>",
                "给药期间应严密监测患者病情": "",
                "给药后应再次核对患者身份信息及药品信息，完成护理记录": "",
            }
        }
    },
    {
        key: "occupationalProtection",
        label: "职业防护",
        children: [],
        content: {
            type: "drugDetail",
            detail: {
                "戴双层手套": "",
                "戴口罩": "",
                "换药时确保瓶/口朝上": "",
                "治疗结束后不分离输液瓶/袋与输液器，将其整体放入黄色医疗垃圾袋": "",
                "使用便携式输液泵输注抗肿瘤药物结束后，便携式输液泵丢弃前需使用专用导管帽套住圆锥接头或单独装入黄色医疗垃圾袋中，有效密封垃圾袋": "",
                "有毒性药物标识的黄色带盖容器收集含抗肿瘤药物的医疗废弃物，容器内套双层黄色医疗垃圾袋，当容器 3/4 满时，有效封口垃圾袋并贴上专用标识": "",
                "在使用抗肿瘤药物的环境中配备溢出包，内含防水隔离衣、一次性口罩、橡胶/丁腈手套、面罩、护目镜、鞋套、吸水垫及医疗垃圾袋等": "",
                "抗肿瘤药物外溢时，立即关闭空调，遵循 WS/T 433—2023中 8.2.6 处理。溢出现场清理完成后应通风换气，可对清理后的区域进行环境检测。": "",
            }
        }
    },
    {
        key: "assessment",
        label: "评估",
        children: [
            {
                key: "doubleCheck",
                label: "双人核对",
                content: {
                    type: "drugDetail",
                    detail: {
                        "药物名称": "",
                        "规格": "",
                        "剂量": "",
                        "给药途径": "",
                        "有效期": "",
                        "包装完整性": "",
                    }
                }
            },
            {key: "assessment2", label: "治疗方案"},
            {key: "assessment3", label: "药物性质"},
            {
                key: "assessment4",
                label: "血管条件",
                content: {
                    type: "drugDetail",
                    detail: {
                        "不使用一次性静脉输液钢针输注刺激性或发疱性抗肿瘤药物": "",
                        "不宜使用外周血管通路装置输注刺激性或发疱性抗肿瘤药物": "",
                        "使用便携式输注泵给药时，宜选择中心静脉血管通路": "",
                    }
                }
            },
            {key: "assessment5", label: "用药史"},
            {
                key: "assessment6",
                label: "不良反应史",
                content: {
                    type: "drugDetail",
                    detail: {
                        "既往胃肠道反应": "",
                        "周围神经毒性反应": "",
                        "骨髓抑制反应": "",
                    }
                }
            },
            {key: "assessment7", label: "过敏史"},
            {key: "assessment8", label: "两种及以上方式查对患者身份信息"},
            {
                key: "assessment9",
                label: "遵照药品说明书选择适宜的输液装置",
                content: {
                    type: "drugDetail",
                    detail: {
                        "材质": "",
                        "过滤器孔径": "",
                    }
                }
            },
        ]
    },
    {
        key: "drugCategory",
        label: "药物分类",
        children: [
            {
                key: "targeted",
                label: "分子靶向药物",
                children: [
                    {
                        key: "rituximab",
                        label: "利妥昔单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "靶向",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "1",
                                "输液时间（min）": "首次50mg/h，如果无输液反应，可每30min 增加50mg/h；后续100mg/h，每30min 增加100 mg/h。最大速度400mg/h",
                                "稳定性（h）": "12（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "cetuximab",
                        label: "西妥昔单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "靶向",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "首次120，耐受良好后续60",
                                "稳定性（h）": "现配现用",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "pertuzumab",
                        label: "帕妥珠单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "靶向",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "250",
                                "浓度（mg/ml）": "1.6～3.0",
                                "输液时间（min）": "起始剂量为840mg，静脉输注时间为 60min；给药剂量为420mg，静脉输注时间为30～60min。曲妥珠单抗与帕妥珠单抗联合使用时，本品起始剂量按8mg/kg，静脉输注时间为90 min；此后每3周一次，本品剂量按 6mg/kg，静脉输注时间为30～90min",
                                "稳定性（h）": "24",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "trastuzumab",
                        label: "曲妥珠单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "靶向",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "259",
                                "浓度（mg/ml）": "21",
                                "输液时间（min）": "首次＞90，耐受良好后续30",
                                "稳定性（h）": "24",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "nimotuzumab",
                        label: "尼妥珠单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "靶向",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "250",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "＞60",
                                "稳定性（h）": "8（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "bevacizumab",
                        label: "贝伐珠单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "靶向",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "1.4～16.5",
                                "输液时间（min）": "首次＞90，耐受良好第二次60，耐受良好后续30",
                                "稳定性（h）": "24",
                                "注意事项": "/"
                            }
                        }
                    },
                ],
            },
            {
                key: "immunotherapy",
                label: "免疫治疗药物",
                children: [
                    {
                        key: "immunotherapy1",
                        label: "信迪利单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "100",
                                "浓度（mg/ml）": "1.5～5",
                                "输液时间（min）": "30～60",
                                "稳定性（h）": "6（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "immunotherapy2",
                        label: "阿替利珠单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "100",
                                "浓度（mg/ml）": "1.5～5",
                                "输液时间（min）": "30～60",
                                "稳定性（h）": "6（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "immunotherapy3",
                        label: "替雷利珠单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "首次＞60，耐受良好后续＞30",
                                "稳定性（h）": "8（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "immunotherapy4",
                        label: "度伐利尤单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "1～15",
                                "输液时间（min）": "＞60",
                                "稳定性（h）": "4（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "immunotherapy5",
                        label: "纳武利尤单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液 <br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "1/10",
                                "输液时间（min）": "60",
                                "稳定性（h）": "8（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "immunotherapy6",
                        label: "特瑞普利单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "100",
                                "浓度（mg/ml）": "1～3",
                                "输液时间（min）": "首次＞60，耐受良好后续30",
                                "稳定性（h）": "8（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "immunotherapy7",
                        label: "帕博利珠单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "1～10",
                                "输液时间（min）": "＞30",
                                "稳定性（h）": "6（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "immunotherapy8",
                        label: "卡瑞利珠单抗",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "30～60",
                                "稳定性（h）": "6（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                ],
            },
            {
                key: "endocrine",
                label: "内分泌治疗药物",
                children: [],
            },
            {
                key: "chemotherapy",
                label: "化学治疗药物",
                children: [
                    {
                        key: "chemotherapy1",
                        label: "氟达拉滨",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "影响核酸合成",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "100",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "＞30",
                                "稳定性（h）": "8",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "chemotherapy2",
                        label: "艾立布林",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "干扰微血管蛋白合成",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "100",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "60",
                                "稳定性（h）": "4（室温）24（4°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "chemotherapy3",
                        label: "紫杉醇脂质体",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "干扰微血管蛋白合成",
                                "溶媒": "5%葡萄糖注射液",
                                "溶媒量（ml）": "250～500",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "180",
                                "稳定性（h）": "24",
                                "注意事项": "禁忌使用精密输液器"
                            }
                        }
                    },
                    {
                        key: "chemotherapy4",
                        label: "紫杉醇注射液",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "干扰微血管蛋白合成",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "250",
                                "浓度（mg/ml）": "0.74～0.9",
                                "输液时间（min）": "60",
                                "稳定性（h）": "4～6",
                                "注意事项": "避光保存，密闭，2-25℃，预处理，滴注时采用非PVC输液袋"
                            }
                        }
                    },
                    {
                        key: "chemotherapy5",
                        label: "多西他赛",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "干扰微血管蛋白合成",
                                "溶媒": "0.9%氯化钠注射液 <br>5%葡萄糖注射液",
                                "溶媒量（ml）": "250",
                                "浓度（mg/ml）": "0.74～0.9",
                                "输液时间（min）": "60",
                                "稳定性（h）": "4～6",
                                "注意事项": "避光保存，密闭，2-25℃，预处理，滴注时采用非PVC输液袋"
                            }
                        }
                    },
                    {
                        key: "chemotherapy6",
                        label: "长春瑞滨",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "干扰微血管蛋白合成",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "20～50",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "15～20",
                                "稳定性（h）": "24",
                                "注意事项": "避光保存，密闭，2-8℃，配液后避免光照"
                            }
                        }
                    },
                    {
                        key: "chemotherapy7",
                        label: "长春地辛",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "干扰微血管蛋白合成",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "360～720（5%葡萄糖注射液）",
                                "稳定性（h）": "6（0.9%氯化钠注射液）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "chemotherapy8",
                        label: "优替德隆",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "干扰微血管蛋白合成",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "0.12～0.5",
                                "输液时间（min）": "90/1440",
                                "稳定性（h）": "8",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "chemotherapy9",
                        label: "阿糖胞苷",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "影响核酸合成",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "100",
                                "输液时间（min）": "60～180",
                                "稳定性（h）": "24",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "chemotherapy10",
                        label: "紫杉醇白蛋白",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "干扰微血管蛋白合成",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "5",
                                "输液时间（min）": "30",
                                "稳定性（h）": "8",
                                "注意事项": "避光保存，20-30℃，禁忌使用精密输液器"
                            }
                        }
                    },
                    {
                        key: "chemotherapy11",
                        label: "表柔比星",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于核酸转录",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "2",
                                "输液时间（min）": "30",
                                "稳定性（h）": "12",
                                "注意事项": "避光保存，不超过20°C"
                            }
                        }
                    },
                    {
                        key: "chemotherapy12",
                        label: "多柔比星脂质体",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于核酸转录",
                                "溶媒": "5%葡萄糖溶液",
                                "溶媒量（ml）": "250～500",
                                "浓度（mg/ml）": "＜90 mg，250 ml；≥90 mg，500 ml",
                                "输液时间（min）": "＞30",
                                "稳定性（h）": "24",
                                "注意事项": "禁忌使用精密输液器"
                            }
                        }
                    },
                    {
                        key: "chemotherapy13",
                        label: "米托蒽醌",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于核酸转录",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "＞50",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "＞30",
                                "稳定性（h）": "8",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "chemotherapy14",
                        label: "多柔比星",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于核酸转录",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "2",
                                "输液时间（min）": "60～120",
                                "稳定性（h）": "24",
                                "注意事项": "避光保存，不超过20°C"
                            }
                        }
                    },
                    {
                        key: "chemotherapy15",
                        label: "吡柔比星",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于核酸转录",
                                "溶媒": "5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "/",
                                "稳定性（h）": "6",
                                "注意事项": "避光保存，不超过20°C"
                            }
                        }
                    },
                    {
                        key: "chemotherapy16",
                        label: "达卡巴嗪",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于DNA结构",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "250～500",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "＞30",
                                "稳定性（h）": "现配现用",
                                "注意事项": "避光保存，密闭，2～8°C，避光输注，遇热、光不稳定，易变红"
                            }
                        }
                    },
                    {
                        key: "chemotherapy17",
                        label: "异环磷酰胺",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于DNA结构",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "500～1000",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "＞30",
                                "稳定性（h）": "现配现用",
                                "注意事项": "避光保存，密闭，2～8°C"
                            }
                        }
                    },
                    {
                        key: "chemotherapy18",
                        label: "环磷酰胺",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于DNA结构",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "30～120",
                                "稳定性（h）": "3",
                                "注意事项": "遮光保存，密闭，25℃以下"
                            }
                        }
                    },
                    {
                        key: "chemotherapy19",
                        label: "顺铂",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于DNA结构",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖氯化钠注射液",
                                "溶媒量（ml）": "300～500",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "6～120",
                                "稳定性（h）": "24",
                                "注意事项": "遮光保存，密闭"
                            }
                        }
                    },
                    {
                        key: "chemotherapy20",
                        label: "卡铂",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于DNA结构",
                                "溶媒": "5%葡萄糖注射液",
                                "溶媒量（ml）": "250～500",
                                "浓度（mg/ml）": "0.5",
                                "输液时间（min）": "30～60",
                                "稳定性（h）": "8（室温）",
                                "注意事项": "遮光保存，滴注及存放时避免直接日晒"
                            }
                        }
                    },
                    {
                        key: "chemotherapy21",
                        label: "奈达铂",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于DNA结构",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "500",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "＞60",
                                "稳定性（h）": "/",
                                "注意事项": "遮光保存、密闭、阴凉处，输注不小于1小时，避免接触含铝器械"
                            }
                        }
                    },
                    {
                        key: "chemotherapy22",
                        label: "奥沙利铂",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于DNA结构",
                                "溶媒": "5%葡萄糖注射液",
                                "溶媒量（ml）": "250～500",
                                "浓度（mg/ml）": "＞0.2",
                                "输液时间（min）": "120～360",
                                "稳定性（h）": "24（2°C～8°C）",
                                "注意事项": "避光保存，25℃，短暂储存于15-30℃，稀释后，无需避光"
                            }
                        }
                    },
                    {
                        key: "chemotherapy23",
                        label: "洛铂",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于DNA结构",
                                "溶媒": "5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "120",
                                "稳定性（h）": "4（2°C～8°C）",
                                "注意事项": "遮光保存，25℃以下，不能用氯化钠溶解，增加洛铂降解"
                            }
                        }
                    },
                    {
                        key: "chemotherapy24",
                        label: "依托泊苷",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于DNA复制",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "≦0.25",
                                "输液时间（min）": "＞30",
                                "稳定性（h）": "未知",
                                "注意事项": "遮光保存，密闭，30℃以下"
                            }
                        }
                    },
                    {
                        key: "chemotherapy25",
                        label: "替尼泊苷",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于DNA复制",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "500",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "＞30",
                                "稳定性（h）": "4",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "chemotherapy26",
                        label: "伊立替康",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于DNA复制",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "0.12～2.8",
                                "输液时间（min）": "30～90",
                                "稳定性（h）": "6",
                                "注意事项": "遮光保存，密闭，30℃以下，不使用时，不要打开药盒,避光输注，输注时间90分钟"
                            }
                        }
                    },
                    {
                        key: "chemotherapy27",
                        label: "托泊替康",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "作用于DNA复制",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "25～50",
                                "输液时间（min）": "30",
                                "稳定性（h）": "24",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "chemotherapy28",
                        label: "吉西他滨",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "影响叶酸合成",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "100",
                                "浓度（mg/ml）": "≦40",
                                "输液时间（min）": "30",
                                "稳定性（h）": "24",
                                "注意事项": "室温保存15-30℃"
                            }
                        }
                    },
                    {
                        key: "chemotherapy29",
                        label: "培美曲塞",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "影响核酸合成",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "100",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "＞10",
                                "稳定性（h）": "24",
                                "注意事项": "室温保存"
                            }
                        }
                    },
                    {
                        key: "chemotherapy30",
                        label: "雷替曲塞",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "影响核酸合成",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "50～250",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "＞15",
                                "稳定性（h）": "24",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: "chemotherapy31",
                        label: "氟尿嘧啶",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "影响核酸合成",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "遵医嘱",
                                "稳定性（h）": "/",
                                "注意事项": "遮光保存，10-30℃，静脉滴注速度越慢、疗效越好而毒副作用相应减轻"
                            }
                        }
                    },
                    {
                        key: "chemotherapy32",
                        label: "甲氨蝶呤",
                        content: {
                            type: "drugDetail",
                            detail: {
                                "药物性质": "影响核酸合成",
                                "溶媒": "0.9%氯化钠注射液<br>5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "<360",
                                "稳定性（h）": "未知",
                                "注意事项": "避光保存，密闭，2-8℃"
                            }
                        }
                    },
                ],
            }
        ]
    }
]

// ==================== 从菜单配置自动生成图谱数据 ====================

// 递归生成图谱节点和边
const generateGraphNodes = (items, parentId = null, level = 1) => {
    const nodes = []
    const edges = []

    for (const item of items) {
        // 添加当前节点
        const nodeType = level === 3 ? "drug" : "menu"
        nodes.push({
            id: item.key,
            name: item.label,
            type: nodeType,
            level: level
        })

        // 如果有父节点，添加边
        if (parentId) {
            edges.push({
                source: parentId,
                target: item.key,
                label: "",
                arrow: true  // 有箭头
            })
        }

        // 递归处理子节点
        if (item.children && item.children.length > 0) {
            const { nodes: childNodes, edges: childEdges } = generateGraphNodes(
                item.children,
                item.key,
                level + 1
            )
            nodes.push(...childNodes)
            edges.push(...childEdges)
        }
    }

    return { nodes, edges }
}

// 生成图谱数据
const { nodes: graphNodes, edges: graphEdges } = generateGraphNodes(leftMenuConfig)

// 获取所有一级菜单节点的key（用于添加它们之间的连接）
const level1Keys = leftMenuConfig.map(item => item.key)

// 添加一级菜单之间的连接（形成链路）
const level1Edges = []
for (let i = 0; i < level1Keys.length - 1; i++) {
    level1Edges.push({
        source: level1Keys[i],
        target: level1Keys[i + 1],
        label: "",
        arrow: false  // 无箭头
    })
}

// 合并所有边
const allEdges = [...graphEdges, ...level1Edges]

export const graphData = {
    nodes: graphNodes,
    edges: allEdges
}

// ==================== 辅助函数 ====================

// 递归查找菜单项内容
export const getMenuContentByKey = (menuKey) => {
    const findContent = (items, key) => {
        for (const item of items) {
            if (item.key === key) {
                return item.content || null
            }
            if (item.children && item.children.length) {
                const found = findContent(item.children, key)
                if (found) return found
            }
        }
        return null
    }
    return findContent(leftMenuConfig, menuKey)
}

// 递归查找菜单项标题
export const findMenuTitleByKey = (menuKey) => {
    const findTitle = (items, key) => {
        for (const item of items) {
            if (item.key === key) {
                return item.label
            }
            if (item.children && item.children.length) {
                const found = findTitle(item.children, key)
                if (found) return found
            }
        }
        return null
    }
    return findTitle(leftMenuConfig, menuKey)
}