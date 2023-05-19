import fs from 'fs';
import sass from 'sass';

/**
 * 配置参数
 * https://sass-lang.com/documentation/cli/dart-sass
 * 接口
 * https://sass-lang.com/documentation/js-api/
 *
 * @param srcPath 必须确保路径下得文件夹存在
 * @param dstPath 必须确保路径下得文件夹存在
 */
export function parseFile(
  srcPath,
  dstPath,
  options = { hasMap: false, compress: false },
) {
  const result = sass.compile(srcPath, {
    style: options.compress ? 'expanded' : 'compressed',
    sourceMap: options.hasMap,
  });
  let dstMapPath = `${dstPath}.map`;
  if (fs.existsSync(dstPath)) fs.rmSync(dstPath);
  if (fs.existsSync(dstMapPath)) fs.rmSync(dstMapPath);

  fs.writeFileSync(dstPath, result.css, (err) => err && console.log(err));
  if (options.hasMap)
    fs.writeFileSync(
      dstMapPath,
      JSON.stringify(result.sourceMap),
      (err) => err && console.log(err),
    );
}

const retainType = process.env.npm_lifecycle_event;
parseFile('./style/index.scss', './public/index.css', { hasMap: true });
parseFile('./style/admin.scss', './public/admin.css', { hasMap: true });
