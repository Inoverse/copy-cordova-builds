module.exports = function(context) {
  // make sure android platform is part of build
  if (context.opts.platforms.indexOf("android") >= 0) {
    runAndroidCopy(context);
  }
  if (context.opts.platforms.indexOf("ios") >= 0) {
    runIOSCopy(context);
  }

  return true;
};

function runIOSCopy(context) {
  var fs = context.requireCordovaModule("fs"),
    path = context.requireCordovaModule("path"),
    ConfigParser = context.requireCordovaModule("cordova-lib").configparser;

  var configFileLocation = path.join(context.opts.projectRoot, "config.xml");
  var config = new ConfigParser(configFileLocation);

  var platformRoot = path.join(context.opts.projectRoot, "platforms/ios");
  var buildType = "debug";
  var buildOptions = context.opts.options || {};
  var ipaFileName =
    String(config.name()).replace(/ /g, "_") +
    "_v" +
    config.version() +
    "-" +
    config.ios_CFBundleVersion() +
    ".ipa";

  if (buildOptions.hasOwnProperty("release")) {
    buildType = "release";
    ipaFileName = String(config.name()).replace(/ /g, "_") + "_release.ipa";
  }

  var ipaFileLocation = path.join(
    platformRoot,
    "build/device/" + String(config.name()).replace(/ /g, "_") + ".ipa"
  );

  var ipaDestination = path.join(
    context.opts.projectRoot,
    "builds",
    ipaFileName
  );
  var destinationFolder = path.join(context.opts.projectRoot, "builds");

  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }
  fs
    .createReadStream(ipaFileLocation)
    .pipe(fs.createWriteStream(ipaDestination));
  console.log("Copy to", ipaDestination);
}

function runAndroidCopy(context) {
  var fs = context.requireCordovaModule("fs"),
    path = context.requireCordovaModule("path"),
    ConfigParser = context.requireCordovaModule("cordova-lib").configparser;

  var configFileLocation = path.join(context.opts.projectRoot, "config.xml");
  var config = new ConfigParser(configFileLocation);

  var platformRoot = path.join(context.opts.projectRoot, "platforms/android");
  var buildType = "debug";
  var buildOptions = context.opts.options || {};
  var apkFilename =
    String(config.name()).replace(/ /g, "_") +
    "_v" +
    config.version() +
    "-" +
    config.android_versionCode() +
    ".apk";

  if (buildOptions.hasOwnProperty("release")) {
    buildType = "release";
    apkFilename = String(config.name()).replace(/ /g, "_") + "_release.apk";
  }

  var apkFileLocation = path.join(
    platformRoot,
    "build/outputs/apk/android-" + buildType + ".apk"
  );
  var apkDestination = path.join(
    context.opts.projectRoot,
    "builds",
    apkFilename
  );
  var destinationFolder = path.join(context.opts.projectRoot, "builds");

  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }
  fs
    .createReadStream(apkFileLocation)
    .pipe(fs.createWriteStream(apkDestination));
  console.log("Copy to", apkDestination);
}
