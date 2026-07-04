import { motion } from "framer-motion";

function StatCard({

  title,

  value,

  icon,

  color,

  subtitle,

  onClick,

  progress,

}) {

  return (

    <motion.div

      whileHover={{
        scale: 1.04,
        y: -5,
      }}

      whileTap={{
        scale: 0.98,
      }}

      onClick={onClick}

      className={`
        ${color}
        text-white
        rounded-3xl
        shadow-2xl
        p-7
        relative
        overflow-hidden
        transition
        duration-300
        cursor-pointer
      `}
    >

      {/* BACKGROUND CIRCLE */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>

      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full"></div>

      {/* CONTENT */}
      <div className="relative z-10">

        <div className="flex justify-between items-start">

          {/* LEFT */}
          <div>

            {/* TITLE */}
            <h2 className="text-lg font-medium opacity-90">

              {title}

            </h2>

            {/* VALUE */}
            <p className="text-5xl font-extrabold mt-3">

              {value}

            </p>

            {/* SUBTITLE */}
            {subtitle && (

              <p className="mt-3 text-sm opacity-80">

                {subtitle}

              </p>

            )}

          </div>

          {/* ICON */}
          <div className="text-6xl opacity-80">

            {icon}

          </div>

        </div>

        {/* PROGRESS BAR */}
        {
          progress !== undefined && (

            <div className="mt-6">

              <div className="flex justify-between text-sm mb-2 opacity-90">

                <span>
                  Progress
                </span>

                <span>
                  {progress}%
                </span>

              </div>

              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width:
                      `${progress}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="bg-white h-3 rounded-full"
                />

              </div>

            </div>

          )
        }

      </div>

    </motion.div>
  );
}

export default StatCard;