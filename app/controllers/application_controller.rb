class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_message

  private

  def render_unprocessable_entity_message(invalid)
      render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  def authorize
      @user = User.find_by(id: session[:user_id])
      return render json: { errors: ["Not Authorized"] }, status: :unauthorized unless @user
  end
end
