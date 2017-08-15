module.exports = function(context) {
    // make sure android platform is part of build
    if (context.opts.platforms.indexOf("android") < 0) {
      return;
    }
  
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
  
    return true;
  };
  