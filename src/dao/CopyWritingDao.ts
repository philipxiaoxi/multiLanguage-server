import CopyWriting from '@/entity/CopyWriting';
import dataSource from '@util/app-data-source';

export default class CopyWritingDao {
  /**
   * 新增语言文案
   * @param copyWriting
   */
  static addCopyWriting = (copyWriting: CopyWriting | Array<CopyWriting>) => {
    const data = dataSource
      .createQueryBuilder()
      .insert()
      .into(CopyWriting)
      .values(copyWriting)
      .execute();
    return data;
  };

  /**
   * 查询语言文案
   * @param copyWriting
   */
  static queryCopyWriting = (copyWriting: CopyWriting) => {
    const { modulesKey, subModulesKey, langKey, langText, copyKey } =
      copyWriting;
    let data = dataSource
      .createQueryBuilder(CopyWriting, 'copyWriting')
      .where('copyWriting.modulesKey = :modulesKey', { modulesKey });
    if (subModulesKey) {
      data = data.andWhere('copyWriting.subModulesKey = :subModulesKey', {
        subModulesKey,
      });
    }
    if (copyKey) {
      data = data.andWhere('copyWriting.copyKey = :copyKey', {
        copyKey,
      });
    }
    if (langKey) {
      data = data.andWhere('copyWriting.langKey = :langKey', {
        langKey,
      });
    }
    if (langText) {
      data = data.andWhere('copyWriting.langText like :langText', {
        langText: `%${langText}%`,
      });
    }
    return data.getMany();
  };
}
